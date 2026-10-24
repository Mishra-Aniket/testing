-- 004: Drop the EmailJS notification triggers.
--
-- Why: the browser already sends the branded EmailJS email directly
-- (lib/emailjs.js, primary delivery). These pg_net triggers fired on every
-- insert, so every submission produced TWO branded emails.
--
-- Supabase keeps its role as the database record only:
-- contact_messages / subscribers rows still store every submission.
--
-- Paste this whole file into: Supabase Dashboard > SQL Editor > Run
-- (idempotent — safe to run more than once)

drop trigger if exists notify_contact_message_trigger on contact_messages;
drop trigger if exists notify_subscriber_trigger on subscribers;

drop function if exists notify_new_contact_message();
drop function if exists notify_new_subscriber();
