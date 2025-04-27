import { Hono } from 'hono';
import db from '../../shared/database/models';
import { UserProvider } from '../../shared/entities/users/user.provider';

const app = new Hono();

const main = async () => {
    await db.sequelize.sync(
        { force: true } // This creates the table, dropping it first if it already existed
        // { alter: true } // This checks what is the current state of the table in the database, and then performs the necessary changes in the table to make it match the model.
    );

    app.get('/', (c) => c.text('Hello Bun!'))
    app.get('/users', async (c) => {
        const user = await UserProvider.getAllUsers();
        return c.json(user);
    });

    Bun.serve({
        port: 3000,
        fetch: app.fetch,
    });

    console.log('🚀 Server started on http://localhost:3000');
};

main().catch((err) => {
    console.error('Failed to start server:', err)
});
