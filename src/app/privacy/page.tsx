"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-main-bg-light text-primary-text-light">
      <div className="w-full max-w-2xl mx-auto py-12 flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold mb-2 text-primary-text-light">Privacy Policy</h1>
        <div className="bg-card-bg-light rounded-2xl shadow-card-bg-light p-6 w-full max-h-[60vh] overflow-y-auto text-muted-text-light text-sm">
          <p><strong>Placeholder Privacy Policy:</strong></p>
          <p>This is a sample privacy policy for the Robux Rewards platform. We respect your privacy and are committed to protecting your personal information. We do not collect your Roblox password or any sensitive data. All information is used solely for the purpose of providing rewards and improving our service.</p>
          <p>By using our platform, you agree to the collection and use of information in accordance with this policy. We may update this policy from time to time. Please review it regularly.</p>
          <p>If you have any questions about our privacy practices, please contact us at support@robuxrewards.com.</p>
        </div>
      </div>
    </div>
  );
} 