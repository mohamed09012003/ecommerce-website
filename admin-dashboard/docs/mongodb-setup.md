# MongoDB Atlas setup (local)

1. Install the official MongoDB Node driver:

```bash
npm install mongodb
```

2. Copy `.env.local.example` to `.env.local` and set your Atlas URI and DB name:

```env
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DB="admin-dashboard-db"
```

3. Example usage (server-side):

```js
import clientPromise from "@/lib/mongodb";

export async function getUsers() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const users = await db.collection("users").find({}).toArray();
  return users;
}
```

4. Notes
- Keep your `.env.local` out of source control.
- Restart the Next.js dev server after changing environment variables.
- In serverless environments, the driver handles connections per container; the helper caches the client in development to avoid exhausting connections during hot-reloads.
