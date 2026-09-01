export async function onRequestPost(context) {
  try {
    const recipientEmail = context.env.FORM_SUBMIT_TO_EMAIL;

    if (!recipientEmail) {
      return jsonResponse(
        {
          success: false,
          message:
            "Server configuration is incomplete. Missing FORM_SUBMIT_TO_EMAIL.",
        },
        500
      );
    }

    const incoming = await context.request.formData();
    const name = String(incoming.get("name") || "").trim();
    const email = String(incoming.get("email") || "").trim();
    const phone = String(incoming.get("phone") || "").trim();
    const desiredAmount = String(incoming.get("desiredAmount") || "").trim();
    const submittedAt = String(incoming.get("submittedAt") || "").trim();

    if (!name || !email || !phone || !desiredAmount) {
      return jsonResponse(
        { success: false, message: "Missing required form fields." },
        400
      );
    }

    const outgoing = new FormData();
    outgoing.append("name", name);
    outgoing.append("email", email);
    outgoing.append("phone", phone);
    outgoing.append("desiredAmount", desiredAmount);
    outgoing.append("submittedAt", submittedAt || new Date().toISOString());
    outgoing.append("_subject", "New Personal Loan Request");
    outgoing.append("_template", "table");
    outgoing.append("_captcha", "false");

    const upstream = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: outgoing,
      }
    );

    let upstreamJson = null;
    try {
      upstreamJson = await upstream.json();
    } catch (error) {
      upstreamJson = null;
    }

    const ok =
      upstream.ok &&
      upstreamJson &&
      (upstreamJson.success === true || upstreamJson.success === "true");

    if (!ok) {
      return jsonResponse(
        {
          success: false,
          message:
            (upstreamJson && upstreamJson.message) ||
            "Lead email service rejected the request.",
        },
        502
      );
    }

    return jsonResponse({ success: true }, 200);
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        message: "Unexpected server error while submitting lead request.",
      },
      500
    );
  }
}

function jsonResponse(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
