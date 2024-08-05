🛒 .thePantry 🛒
A simple AI powered pantry inventory system

## Features

- **Add Items Easily:** Input pantry items and have them seamlessly added to the Firestore database.
- **Update & Delete Items:** Modify or remove items with ease to keep your pantry up-to-date.
- **View Pantry Items:** Access a comprehensive list of your pantry items anytime.
- **Image Classification:** Utilize an advanced image classification model from Hugging Face, integrated with the Xenova JS transformer library, to identify pantry items through images.

## Tech Stack

- **Next.js 14 with TypeScript**
- **PostHog** 
- **Firebase**
- **Vercel**
- **Material UI** 

## Installation Guide

Follow these steps to set up the AI-powered pantry application locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mathiaslawson/.thePantry.git
    cd .thePantry
    ```

2. **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:
    ```bash
    npm install
    ```

3. **Set up Firebase:**
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Add a new web app to your Firebase project.
    - Copy the Firebase config object and create a `.env.local` file in the root directory of the project with the following variables:
      ```plaintext
      NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
      NEXT_PUBLIC_POSTHOG_KEY=your_app_id
      NEXT_PUBLIC_POSTHOG_KEY=your_app_id
      NEXT_PUBLIC_POSTHOG_HOST=your_app_id
      ```

4. **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

