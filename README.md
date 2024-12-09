# PostGenAi

## Overview

AI-driven daily news tools that summarize, generate, and repurpose content into multiple formats, enabling seamless information sharing.

## Tech Stack

- **Frontend Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** Material-UI (MUI)

## Prerequisites

Before running this project, make sure you have:

- Node.js (v22 or higher)
- npm or yarn package manager
- Git

## Dependencies

```json
{
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "@mui/material": "^5.14.18",
  "@mui/icons-material": "^5.14.18",
  "next": "14.0.3",
  "react": "^18",
  "react-dom": "^18",
  "autoprefixer": "^10.0.1",
  "postcss": "^8",
  "tailwindcss": "^3.3.0"
}
```

## Installation

#### 1. Clone this project or Download that ZIP file

```sh
$ git clone https://github.com/zignuts-ai/postgen-app
```

#### 2. Make sure you have [npm](https://www.npmjs.org/) installed globally

More details [here](https://nodejs.org/en/download/)

#### 3. On the command prompt run the following commands

```sh
$ cd `project-directory`
```

```sh
$ npm install
```

### `npm run dev` or `yarn run dev`

Runs the app in development mode.
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

By default, for build generate and deploy on server then.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## ENVIRONMENTS

NEXT_PUBLIC_BASE_API_URL

## PROJECT STRUCTURE

```sh
postgen-app/
├── app/ # Next.js app directory
├── src/ # Src directory
├── components/ # Reusable React components
├── public/ # Static files
├── styles/ # Global styles and Tailwind config
├── .env.local # Environment variables
├── package.json # Project dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
└── README.md # Project documentation
```
