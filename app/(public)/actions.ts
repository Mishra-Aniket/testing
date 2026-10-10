'use server';

import { contactMessageSchema } from '@/lib/block-schemas';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

interface FormState {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string[] | undefined>;
}

export async function submitContact(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    '127.0.0.1';

  const rateCheck = await checkRateLimit(`contact:${ip}`, {
    interval: 60 * 1000,
    max: 5,
  });

  if (!rateCheck.success) {
    return {
      success: false,
      error: 'Too many requests. Please wait before submitting again.',
      fieldErrors: {},
    };
  }

  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    project_type: formData.get('project_type') as string,
    budget: formData.get('budget') as string,
    timeline: formData.get('timeline') as string,
    message: formData.get('message') as string,
    _honeypot: formData.get('_honeypot') as string,
  };

  // Honeypot check
  if (raw._honeypot) {
    // Silently succeed for bots
    return { success: true, error: null, fieldErrors: {} };
  }

  const result = contactMessageSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      error: 'Please fix the errors below.',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from('contact_messages').insert({
      name: result.data.name,
      email: result.data.email,
      project_type: result.data.project_type || null,
      budget: result.data.budget || null,
      timeline: result.data.timeline || null,
      message: result.data.message,
    });

    if (error) {
      console.error('[submitContact]', error.message);
      return {
        success: false,
        error: 'Failed to send message. Please try again.',
        fieldErrors: {},
      };
    }

    // Send email notification (optional)
    try {
      await sendEmailNotification(result.data);
    } catch (emailError) {
      console.error('[submitContact] Email notification failed:', emailError);
      // Don't fail the submission if email fails
    }

    return { success: true, error: null, fieldErrors: {} };
  } catch {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
      fieldErrors: {},
    };
  }
}

async function sendEmailNotification(data: {
  name: string;
  email: string;
  project_type?: string;
  budget?: string;
  timeline?: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !ownerEmail) {
    // TODO: Set RESEND_API_KEY to enable email notifications
    console.log('[Email] No RESEND_API_KEY set. Logging message instead:', {
      from: data.email,
      name: data.name,
      projectType: data.project_type,
      budget: data.budget,
      timeline: data.timeline,
      messagePreview: data.message.slice(0, 100),
    });
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: 'Portfolio Contact <contact@aniket.one>',
    to: ownerEmail,
    subject: `New inquiry from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Project Type: ${data.project_type || 'N/A'}`,
      `Budget: ${data.budget || 'N/A'}`,
      `Timeline: ${data.timeline || 'N/A'}`,
      '',
      'Message:',
      data.message,
    ].join('\n'),
  });
}
