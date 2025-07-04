"use client";
import React from "react";
import Link from "next/link";

export default function OffersPage() {
  React.useEffect(() => {
    // 1. Inject var lck = false;
    const scriptLck = document.createElement('script');
    scriptLck.type = 'text/javascript';
    scriptLck.text = 'var lck = false;';
    document.getElementById('cpagrip-offerwall')?.appendChild(scriptLck);

    // 2. Inject the main offerwall script
    const scriptMain = document.createElement('script');
    scriptMain.type = 'text/javascript';
    scriptMain.src = 'https://rileymarker.com/script_include.php?id=502082';
    scriptMain.async = true;
    document.getElementById('cpagrip-offerwall')?.appendChild(scriptMain);

    // 3. Inject the redirect script
    const scriptRedirect = document.createElement('script');
    scriptRedirect.type = 'text/javascript';
    scriptRedirect.text = "if(!lck){top.location = 'https://rileymarker.com/help/ablk.php?lkt=4'; }";
    document.getElementById('cpagrip-offerwall')?.appendChild(scriptRedirect);

    return () => {
      [scriptLck, scriptMain, scriptRedirect].forEach(script => {
        if (script.parentNode) script.parentNode.removeChild(script);
      });
    };
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2">Offerwall</h1>
      <p className="mb-4 text-secondary-light dark:text-secondary-dark text-center">
        Complete offers or watch videos to get robux!
      </p>
      <h2 className="text-xl font-semibold mb-2">CPALead</h2>
      <div className="w-full h-[690px] bg-card-light dark:bg-card-dark rounded-2xl shadow-card-light dark:shadow-card-dark flex items-center justify-center text-secondary-light dark:text-secondary-dark text-lg mb-8">
        <iframe
          sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
          src="https://lnksforyou.com/list/Fh5A"
          style={{ width: "100%", height: "690px", border: "none" }}
          frameBorder="0"
          title="Offer Wall"
        ></iframe>
      </div>
      <h2 className="text-xl font-semibold mb-2">CPAGrip Offerwall</h2>
      <div className="w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-card-light dark:shadow-card-dark flex flex-col items-center justify-center text-secondary-light dark:text-secondary-dark text-lg mb-8 p-4">
        <div id="cpagrip-offerwall" style={{ width: '100%' }}></div>
        <noscript>
          Please enable JavaScript to access this page.
          <meta httpEquiv="refresh" content="0;url=https://rileymarker.com/help/enable_javascript.php?lkt=4" />
        </noscript>
      </div>
      <Link href="/dashboard" className="px-6 py-2 rounded-2xl bg-accent text-white font-semibold hover:opacity-90 transition">Back to Dashboard</Link>
    </div>
  );
} 