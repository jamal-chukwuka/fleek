// src/features/buyer/pages/DemoNotificationPage.tsx
import React, { FC } from 'react';
import NotificationBanner from '../components/NotificationsBanner';
const DemoNotificationPage: FC = () => (
  <div className="container flex-col center">
    <h2>🔔 Notification Demo</h2>
    <p className="form-group">
      This page shows your notification banner. Click the button to open the modal.
    </p>
    <NotificationBanner />
  </div>
);

export default DemoNotificationPage;
