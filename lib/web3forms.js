// Web3Forms — client-side email delivery, free unlimited, no branding stamp.
// Env var: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (public-safe, browser me jata hai)
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function web3formsReady() {
  return Boolean(ACCESS_KEY && ACCESS_KEY.length > 10 && !ACCESS_KEY.includes("placeholder"));
}

export async function sendWeb3Form(params) {
  if (!web3formsReady()) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        from_name: "aniket.one Website",
        ...params,
      }),
    });
    const json = await res.json();
    return json.success === true;
  } catch (e) {
    console.warn("[web3forms] send failed:", e);
    return false;
  }
}
