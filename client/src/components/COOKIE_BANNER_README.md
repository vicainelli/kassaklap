# Cookie Banner Implementation

This project includes a comprehensive cookie consent system that integrates with PostHog analytics while respecting user privacy preferences.

## Features

- 🍪 **GDPR/CCPA Compliant**: Three consent options (Accept All, Essential Only, Reject All)
- 🎯 **PostHog Integration**: Automatically configures tracking based on user consent
- 💾 **Persistent Storage**: Remembers user preferences across sessions
- ⚙️ **Granular Settings**: Detailed cookie category management
- 🎨 **Responsive Design**: Works on all screen sizes
- 🔄 **Real-time Updates**: Changes apply immediately without page refresh

## Components

### Core Components

1. **`CookieBanner`** - Main consent banner that appears on first visit
2. **`CookieSettings`** - Detailed settings modal for managing preferences
3. **`CookieStatus`** - Optional status indicator showing current consent level
4. **`Footer`** - Includes cookie settings trigger and privacy links

### Context & Hooks

- **`CookieConsentProvider`** - Context provider for managing consent state
- **`useCookieConsent`** - Hook for accessing consent state and actions
- **`useConditionalTracking`** - Hook for consent-aware analytics tracking
- **`useCookieSettings`** - Hook for managing settings modal state

## Usage

### Basic Setup

The cookie banner is automatically included in the root layout:

```tsx
// In __root.tsx
<CookieConsentProvider>
  <div className="min-h-screen flex flex-col">
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
  <CookieBanner />
  <CookieStatus />
</CookieConsentProvider>
```

### Tracking Events

Use the `useConditionalTracking` hook to respect user consent:

```tsx
import { useConditionalTracking, TRACKING_EVENTS } from "@/lib/analytics";

function MyComponent() {
  const { track } = useConditionalTracking();

  const handleUserAction = () => {
    track({
      eventName: TRACKING_EVENTS.BUTTON_CLICK,
      properties: {
        button_name: "subscribe",
        location: "header"
      }
    });
  };

  return <button onClick={handleUserAction}>Subscribe</button>;
}
```

### Essential vs Non-Essential Events

```tsx
// Essential events (always tracked, regardless of consent)
track({
  eventName: "error_occurred",
  properties: { error_type: "network" },
  isEssential: true
});

// Non-essential events (only tracked with consent)
track({
  eventName: "feature_used",
  properties: { feature_name: "search" }
  // isEssential defaults to false
});
```

## Consent Types

| Type | Description | PostHog Behavior |
|------|-------------|------------------|
| `"all"` | All cookies accepted | Full tracking enabled |
| `"essential"` | Only essential cookies | Limited tracking, no recordings |
| `"none"` | All cookies rejected | All tracking disabled |
| `null` | No choice made yet | Shows banner |

## Cookie Categories

### Essential Cookies
- Always enabled
- Required for basic website functionality
- Cannot be disabled
- Examples: Authentication, security, core functionality

### Analytics Cookies
- PostHog event tracking
- Page view analytics
- User behavior analysis
- Can be disabled by user

### Marketing Cookies
- Currently unused but prepared for future use
- Would include advertising tracking
- Social media integration
- Can be disabled by user

## Customization

### Styling
The components use Tailwind CSS with design system tokens. Customize by modifying the classes in each component.

### Content
Update banner text and cookie descriptions in:
- `CookieBanner.tsx` - Main banner content
- `CookieSettings.tsx` - Detailed cookie descriptions

### PostHog Configuration
Modify the consent handling in `cookie-consent.tsx`:

```tsx
// Customize PostHog behavior for different consent levels
case "essential":
  posthog.opt_out_capturing();
  posthog.set_config({
    disable_session_recording: true,
    autocapture: false,
    // Add other settings as needed
  });
  break;
```

## Storage

Consent preferences are stored in localStorage:
- `cookie-consent`: User's consent choice
- `cookie-banner-shown`: Whether banner was displayed

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Focus management in modals

## Browser Support

Compatible with all modern browsers that support:
- ES6+
- CSS Grid/Flexbox
- Local Storage
- PostHog requirements

## Testing

Test different consent scenarios:

1. **First Visit**: Banner should appear
2. **Accept All**: Full tracking enabled
3. **Essential Only**: Limited tracking
4. **Reject All**: No tracking
5. **Settings Change**: Updates apply immediately
6. **Page Reload**: Preferences persist

## Privacy Compliance

This implementation helps with:
- GDPR Article 7 (Consent)
- CCPA "Do Not Sell" requirements
- ePrivacy Directive compliance

**Note**: This is a technical implementation. Consult legal experts for complete privacy law compliance.