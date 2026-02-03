# systemd-timer-manager

Manage systemd timer configuration by JSON.

## Setup

Ensure you have [Node.js](https://nodejs.org/) installed.

```bash
# Install dependencies
npm install
```

## Development

You can run the CLI tool directly from source using `jiti`.

```bash
# Run in development mode
npm run dev -- [name]

# Example
npm run dev -- Kanon
```

## Build

To build the project for distribution, use `unbuild`.

```bash
# Build the project
npm run build
```

The output will be generated in the `dist` directory.

## Usage

After building, you can run the CLI using `node`.

```bash
# Run the built CLI
node ./dist/index.mjs [name]

# Help
node ./dist/index.mjs --help
```

## Scripts

- `npm run dev`: Run the CLI from source.
- `npm run build`: Build the project (bundle and generate types).
- `npm run start`: Run the built CLI.

## Docker Environment (Systemd Verification)

Since systemd requires a specific environment to run, you can use the provided Docker setup to verify systemd timer functionality.

### Prerequisites
- Docker
- Docker Compose

### Setup

1. Start the container:
   ```bash
   docker compose up -d
   ```

2. Enter the container:
   ```bash
   docker compose exec app bash
   ```

3. Inside the container, you can run the CLI:
   ```bash
   # Build inside the container (if needed)
   npm install
   npm run build

   # Run the CLI
   ./dist/index.mjs --help
   ```

4. Verify systemd is running:
   ```bash
   systemctl status
   ```

### Cleanup

```bash
docker compose down
```
