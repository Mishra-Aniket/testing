'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { checkLoginRateLimit } from '@/app/admin/actions';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Rate limit check
    const rateCheck = await checkLoginRateLimit();
    if (!rateCheck.success) {
      setError('Too many login attempts. Please wait before trying again.');
      setLoading(false);
      return;
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (otpError) {
      setError(otpError.message);
    } else {
      setOtpSent(true);
    }
    setLoading(false);
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    // Check if MFA is required
    try {
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalData && aalData.nextLevel === 'aal2' && aalData.currentLevel !== 'aal2') {
        const { data: factorsData } = await supabase.auth.mfa.listFactors();
        const totpFactor = factorsData?.totp?.[0];
        if (totpFactor) {
          setMfaFactorId(totpFactor.id);
          setMfaRequired(true);
          setLoading(false);
          return;
        }
      }
    } catch {
      // If MFA check fails or not enrolled, proceed
    }

    router.push('/admin');
    router.refresh();
    setLoading(false);
  }

  async function handleVerifyMfa(e: React.FormEvent) {
    e.preventDefault();
    if (!mfaFactorId) return;

    setLoading(true);
    setError(null);

    const { error: challengeError } = await supabase.auth.mfa.challengeAndVerify({
      factorId: mfaFactorId,
      code: mfaCode,
    });

    if (challengeError) {
      setError(challengeError.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text">Admin Login</h1>
          <p className="text-text-muted text-sm mt-2">
            Owner access only. Sign in with your email.
          </p>
        </div>

        {mfaRequired ? (
          <form onSubmit={handleVerifyMfa} className="space-y-4">
            <p className="text-text-muted text-sm">
              Enter the 6-digit code from your authenticator app (TOTP MFA).
            </p>
            <div>
              <label
                htmlFor="mfa"
                className="block text-sm font-medium text-text mb-2"
              >
                Authenticator Code
              </label>
              <input
                type="text"
                id="mfa"
                required
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-center tracking-widest"
                placeholder="123456"
                autoComplete="one-time-code"
                maxLength={6}
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Verifying MFA...' : 'Verify Authenticator'}
            </Button>
          </form>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Login Code'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-text-muted text-sm">
              Check your email for a verification code.
            </p>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-text mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-center tracking-widest"
                placeholder="000000"
                autoComplete="one-time-code"
                maxLength={6}
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp('');
                setError(null);
              }}
              className="w-full text-text-dim text-sm hover:text-text-muted transition-colors"
            >
              ← Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
