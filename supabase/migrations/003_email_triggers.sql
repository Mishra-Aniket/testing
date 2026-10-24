-- Email notifications via EmailJS (fires when a form is submitted)
-- Requires: pg_net extension (enabled below) + your EmailJS account

create extension if not exists pg_net;

-- 1. Notification for new contact messages (Hire Me modal + Pricing form)
create or replace function notify_new_contact_message()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://api.emailjs.com/api/v1.0/email/send',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'service_id', 'service_75fiyko',
      'template_id', 'template_rjiz5ib',
      'user_id', '3WGVZc4Msq-Y-g5Vh',
      'accessToken', 'WRZiSpkJvkF5uKwwWDwVL',
      'template_params', json_build_object(
        'from_name', NEW.name,
        'reply_email', NEW.email,
        'project_type', coalesce(NEW.project_type, 'Inquiry'),
        'message', NEW.message
      )
    )::jsonb
  );
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists notify_contact_message_trigger on contact_messages;
create trigger notify_contact_message_trigger
after insert on contact_messages
for each row execute function notify_new_contact_message();

-- 2. Notification for new newsletter subscribers
create or replace function notify_new_subscriber()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://api.emailjs.com/api/v1.0/email/send',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'service_id', 'service_75fiyko',
      'template_id', 'template_fr496fi',
      'user_id', '3WGVZc4Msq-Y-g5Vh',
      'accessToken', 'WRZiSpkJvkF5uKwwWDwVL',
      'template_params', json_build_object(
        'subscriber_email', NEW.email
      )
    )::jsonb
  );
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists notify_subscriber_trigger on subscribers;
create trigger notify_subscriber_trigger
after insert on subscribers
for each row execute function notify_new_subscriber();
