import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const client = await db.connect();
const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Milaotou',
      email: '617990031@qq.com',
      password: '33946686aA',
    },
  ];
async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

async function seedBolg() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS blogs (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,  
        update_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
    );
  `;
    const blog = [
        {
            title: 'test',
            content: 'test content',
        },
        {
            title: 'test2',
            content: 'test content2',
        }
    ]

    const insertedCustomers = await Promise.all(
        blog.map(
            (blog) => client.sql`
                INSERT INTO blogs ( title, content )
                VALUES ( ${blog.title}, ${blog.content})
                ON CONFLICT (id) DO NOTHING;
            `,
        ),
    );

    return insertedCustomers;
}

async function seedProduct() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
  CREATE TABLE IF NOT EXISTS projects (
      id BIGSERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,  
      pic_url TEXT NOT NULL,
      update_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
  );
`;
  const blog = [
      {
          title: 'test',
          content: 'test content',
          pic_url: 'https://raw.githubusercontent.com/cuifengbo/upload/refs/heads/main/upload/space.png'
      },
      {
          title: 'test2',
          content: 'test content2',
          pic_url: 'https://raw.githubusercontent.com/cuifengbo/upload/refs/heads/main/upload/space.png'
      }
  ]

  const insertedCustomers = await Promise.all(
      blog.map(
          (blog) => client.sql`
              INSERT INTO projects ( title, content, pic_url )
              VALUES ( ${blog.title}, ${blog.content}, ${blog.pic_url})
              ON CONFLICT (id) DO NOTHING;
          `,
      ),
  );

  return insertedCustomers;
}

export async function GET() {
    // return Response.json({
    //   message:
    //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
    // });
    try {
           await client.sql`BEGIN`;
           await seedProduct();
        //   await seedCustomers();
        //   await seedInvoices();
        //   await seedRevenue();
           await client.sql`COMMIT`;
        //  await seedBolg(); 已完成


        return Response.json({ message: 'seedproduct ok' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}