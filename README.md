# Hydrilla AI Documentation (`docs.hydrilla.ai`)

This directory contains the developer documentation for the Hydrilla AI REST API, powered by [Mintlify](https://mintlify.com).

## Local Development

1. Install the Mintlify CLI:
   ```bash
   npm i -g mintlify
   ```

2. Run the local preview server from this directory:
   ```bash
   cd hydrilla/docs
   mintlify dev
   ```

3. Open `http://localhost:3000` to view the documentation.

## Deployment to `docs.hydrilla.ai`

- Connect the GitHub repository to your [Mintlify Dashboard](https://dashboard.mintlify.com).
- Set the custom domain to `docs.hydrilla.ai`.
- Mintlify will automatically generate SSL certificates and deploy updates whenever commits are pushed to the main branch.
