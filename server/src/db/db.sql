-- General database setup
CREATE DATABASE dnodb;
CREATE EXTENSION "uuid-ossp";
-- Setup for users table
CREATE TABLE users (
  id UUID NOT NULL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  nickname VARCHAR(20) UNIQUE,
  phone VARCHAR(10) UNIQUE,
  date_of_birth DATE,
  gender VARCHAR(6),
  image TEXT,
  wishlist VARCHAR(36) [],
  cart VARCHAR(36) []
);
INSERT INTO users (
    id,
    email,
    password,
    first_name,
    last_name
  )
VALUES (
    uuid_generate_v4(),
    'test2@test.com',
    '7282bc4f49f8c51a710b3f4d442a2dcbe9e71deb0892d56a064f04111d82344d1181f51f5b5fd526fedc26f40798491d67bc441d53dda1f0b85cae4bdf5b588f.2329804b87c05311',
    'John',
    'Johnson'
  );
-- Setup for products table
CREATE TABLE products(
  id UUID NOT NULL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price MONEY NOT NULL,
  images TEXT [],
  quantity SMALLINT DEFAULT 0
);
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Computers',
    'Little Badass 1',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    300,
    '{https://c.dns-shop.ru/thumb/st4/fit/500/500/ff15db69507a8d04c67731e56eb6ac94/2ff22bf0f2ba6bc99085009fb6e723b6c32cc49d8eea42ac127dda64ee295db7.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/dca7f01fc9f0f65f261a054099bedca6/7b8a84a39c24e6d4f297ff79371e5c36fdf4a56545660a31d7d3dc70431672ec.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/03141dcb3f8346d426c9917a923c9f4f/d3115641229a3ccae374976b5d9f52db47b8a4a823e722c603c393c2d269b81b.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/1889b507e78a360799f33ed85b688d59/2ae3ac6899270c10f5f701479f0be85881a7ffe68908792c9d14a4c8fab529c9.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/6de1798d259359ac99049f7194acdd7e/80518ccb77bbf6ed0bf94390b1a3505a51b2e01849be749254ebaceafa66380d.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Computers',
    'Little Badass 2',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    300,
    '{https://c.dns-shop.ru/thumb/st4/fit/500/500/ff15db69507a8d04c67731e56eb6ac94/2ff22bf0f2ba6bc99085009fb6e723b6c32cc49d8eea42ac127dda64ee295db7.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/dca7f01fc9f0f65f261a054099bedca6/7b8a84a39c24e6d4f297ff79371e5c36fdf4a56545660a31d7d3dc70431672ec.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/03141dcb3f8346d426c9917a923c9f4f/d3115641229a3ccae374976b5d9f52db47b8a4a823e722c603c393c2d269b81b.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/1889b507e78a360799f33ed85b688d59/2ae3ac6899270c10f5f701479f0be85881a7ffe68908792c9d14a4c8fab529c9.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/6de1798d259359ac99049f7194acdd7e/80518ccb77bbf6ed0bf94390b1a3505a51b2e01849be749254ebaceafa66380d.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Computers',
    'Little Badass 3',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    300,
    '{https://c.dns-shop.ru/thumb/st4/fit/500/500/ff15db69507a8d04c67731e56eb6ac94/2ff22bf0f2ba6bc99085009fb6e723b6c32cc49d8eea42ac127dda64ee295db7.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/dca7f01fc9f0f65f261a054099bedca6/7b8a84a39c24e6d4f297ff79371e5c36fdf4a56545660a31d7d3dc70431672ec.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/03141dcb3f8346d426c9917a923c9f4f/d3115641229a3ccae374976b5d9f52db47b8a4a823e722c603c393c2d269b81b.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/1889b507e78a360799f33ed85b688d59/2ae3ac6899270c10f5f701479f0be85881a7ffe68908792c9d14a4c8fab529c9.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/6de1798d259359ac99049f7194acdd7e/80518ccb77bbf6ed0bf94390b1a3505a51b2e01849be749254ebaceafa66380d.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Computers',
    'Little Badass 4',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    300,
    '{https://c.dns-shop.ru/thumb/st4/fit/500/500/ff15db69507a8d04c67731e56eb6ac94/2ff22bf0f2ba6bc99085009fb6e723b6c32cc49d8eea42ac127dda64ee295db7.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/dca7f01fc9f0f65f261a054099bedca6/7b8a84a39c24e6d4f297ff79371e5c36fdf4a56545660a31d7d3dc70431672ec.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/03141dcb3f8346d426c9917a923c9f4f/d3115641229a3ccae374976b5d9f52db47b8a4a823e722c603c393c2d269b81b.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/1889b507e78a360799f33ed85b688d59/2ae3ac6899270c10f5f701479f0be85881a7ffe68908792c9d14a4c8fab529c9.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/6de1798d259359ac99049f7194acdd7e/80518ccb77bbf6ed0bf94390b1a3505a51b2e01849be749254ebaceafa66380d.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Computers',
    'Little Badass 5',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    300,
    '{https://c.dns-shop.ru/thumb/st4/fit/500/500/ff15db69507a8d04c67731e56eb6ac94/2ff22bf0f2ba6bc99085009fb6e723b6c32cc49d8eea42ac127dda64ee295db7.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/dca7f01fc9f0f65f261a054099bedca6/7b8a84a39c24e6d4f297ff79371e5c36fdf4a56545660a31d7d3dc70431672ec.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/03141dcb3f8346d426c9917a923c9f4f/d3115641229a3ccae374976b5d9f52db47b8a4a823e722c603c393c2d269b81b.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/1889b507e78a360799f33ed85b688d59/2ae3ac6899270c10f5f701479f0be85881a7ffe68908792c9d14a4c8fab529c9.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/6de1798d259359ac99049f7194acdd7e/80518ccb77bbf6ed0bf94390b1a3505a51b2e01849be749254ebaceafa66380d.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Phones',
    'Bullshit Smartphone 1',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/b05e80a558da493dd57a5ea556da0616/678f3e9f854e4cfa82f7d3dcb343967345f18d61a4c2e3e024a71f9b70af18e5.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f8783470313398b418ec63c5992305d3/68db80da2777dd30d6dd39dbb5e8327a360f2a7962389bcaf9412929a649e987.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/4ec6cda2e10b9e7345a7940132a349ec/94ff68c316552c0ba1874d4623c278ca4d489a73c3697f70cbbe1382270cdd31.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/2a7852ea91dabebcdcf360e792c2f4b1/edc3d2b5493548d7afee1a99f1a9d8e8c19fd8a6aeea8170fe36928304906fd3.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/686f62d40be3907ff1d28d395cc59728/33e482741b6036990ad376aa1b852d052ca5d71256dc95cc0f3cfc3d8b3facc7.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Phones',
    'Bullshit Smartphone 2',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/b05e80a558da493dd57a5ea556da0616/678f3e9f854e4cfa82f7d3dcb343967345f18d61a4c2e3e024a71f9b70af18e5.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f8783470313398b418ec63c5992305d3/68db80da2777dd30d6dd39dbb5e8327a360f2a7962389bcaf9412929a649e987.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/4ec6cda2e10b9e7345a7940132a349ec/94ff68c316552c0ba1874d4623c278ca4d489a73c3697f70cbbe1382270cdd31.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/2a7852ea91dabebcdcf360e792c2f4b1/edc3d2b5493548d7afee1a99f1a9d8e8c19fd8a6aeea8170fe36928304906fd3.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/686f62d40be3907ff1d28d395cc59728/33e482741b6036990ad376aa1b852d052ca5d71256dc95cc0f3cfc3d8b3facc7.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Phones',
    'Bullshit Smartphone 3',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/b05e80a558da493dd57a5ea556da0616/678f3e9f854e4cfa82f7d3dcb343967345f18d61a4c2e3e024a71f9b70af18e5.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f8783470313398b418ec63c5992305d3/68db80da2777dd30d6dd39dbb5e8327a360f2a7962389bcaf9412929a649e987.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/4ec6cda2e10b9e7345a7940132a349ec/94ff68c316552c0ba1874d4623c278ca4d489a73c3697f70cbbe1382270cdd31.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/2a7852ea91dabebcdcf360e792c2f4b1/edc3d2b5493548d7afee1a99f1a9d8e8c19fd8a6aeea8170fe36928304906fd3.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/686f62d40be3907ff1d28d395cc59728/33e482741b6036990ad376aa1b852d052ca5d71256dc95cc0f3cfc3d8b3facc7.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Phones',
    'Bullshit Smartphone 4',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/b05e80a558da493dd57a5ea556da0616/678f3e9f854e4cfa82f7d3dcb343967345f18d61a4c2e3e024a71f9b70af18e5.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f8783470313398b418ec63c5992305d3/68db80da2777dd30d6dd39dbb5e8327a360f2a7962389bcaf9412929a649e987.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/4ec6cda2e10b9e7345a7940132a349ec/94ff68c316552c0ba1874d4623c278ca4d489a73c3697f70cbbe1382270cdd31.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/2a7852ea91dabebcdcf360e792c2f4b1/edc3d2b5493548d7afee1a99f1a9d8e8c19fd8a6aeea8170fe36928304906fd3.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/686f62d40be3907ff1d28d395cc59728/33e482741b6036990ad376aa1b852d052ca5d71256dc95cc0f3cfc3d8b3facc7.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'Phones',
    'Bullshit Smartphone 5',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/b05e80a558da493dd57a5ea556da0616/678f3e9f854e4cfa82f7d3dcb343967345f18d61a4c2e3e024a71f9b70af18e5.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f8783470313398b418ec63c5992305d3/68db80da2777dd30d6dd39dbb5e8327a360f2a7962389bcaf9412929a649e987.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/4ec6cda2e10b9e7345a7940132a349ec/94ff68c316552c0ba1874d4623c278ca4d489a73c3697f70cbbe1382270cdd31.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/2a7852ea91dabebcdcf360e792c2f4b1/edc3d2b5493548d7afee1a99f1a9d8e8c19fd8a6aeea8170fe36928304906fd3.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/686f62d40be3907ff1d28d395cc59728/33e482741b6036990ad376aa1b852d052ca5d71256dc95cc0f3cfc3d8b3facc7.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'TV',
    'Propaganda Box 1',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/0843f7fc1a1e45560fba418beefbe958/08397172c53b32a9277b7b3c0e866da597cc4fef289b5db996fac10cdf5cca0c.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f484c075e736a714eb0edcf1ff16f92a/2068f8ff83e72e817c35451f185f58d6c986daeffb0c083388c8a72a06f94662.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/5803c1cc29d7bb563c32e07323b10225/414cba8fc174fdf2e743a0fe3ed4f28b3ce1dcecb73a51a14b276373bb1c2cda.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/8742903841a49821523796220c48715f/6865153958a215d846b416aeeaeee45d8aed65782cc79b0fe52b81b9e663e709.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/c0c0eae68492ad1ad2ad10d1ad0b2a55/c16e52860e76634f04a52784a94b1d6654f399130737872be85f904460d47fc9.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'TV',
    'Propaganda Box 2',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/0843f7fc1a1e45560fba418beefbe958/08397172c53b32a9277b7b3c0e866da597cc4fef289b5db996fac10cdf5cca0c.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f484c075e736a714eb0edcf1ff16f92a/2068f8ff83e72e817c35451f185f58d6c986daeffb0c083388c8a72a06f94662.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/5803c1cc29d7bb563c32e07323b10225/414cba8fc174fdf2e743a0fe3ed4f28b3ce1dcecb73a51a14b276373bb1c2cda.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/8742903841a49821523796220c48715f/6865153958a215d846b416aeeaeee45d8aed65782cc79b0fe52b81b9e663e709.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/c0c0eae68492ad1ad2ad10d1ad0b2a55/c16e52860e76634f04a52784a94b1d6654f399130737872be85f904460d47fc9.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'TV',
    'Propaganda Box 3',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/0843f7fc1a1e45560fba418beefbe958/08397172c53b32a9277b7b3c0e866da597cc4fef289b5db996fac10cdf5cca0c.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f484c075e736a714eb0edcf1ff16f92a/2068f8ff83e72e817c35451f185f58d6c986daeffb0c083388c8a72a06f94662.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/5803c1cc29d7bb563c32e07323b10225/414cba8fc174fdf2e743a0fe3ed4f28b3ce1dcecb73a51a14b276373bb1c2cda.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/8742903841a49821523796220c48715f/6865153958a215d846b416aeeaeee45d8aed65782cc79b0fe52b81b9e663e709.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/c0c0eae68492ad1ad2ad10d1ad0b2a55/c16e52860e76634f04a52784a94b1d6654f399130737872be85f904460d47fc9.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'TV',
    'Propaganda Box 4',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/0843f7fc1a1e45560fba418beefbe958/08397172c53b32a9277b7b3c0e866da597cc4fef289b5db996fac10cdf5cca0c.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f484c075e736a714eb0edcf1ff16f92a/2068f8ff83e72e817c35451f185f58d6c986daeffb0c083388c8a72a06f94662.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/5803c1cc29d7bb563c32e07323b10225/414cba8fc174fdf2e743a0fe3ed4f28b3ce1dcecb73a51a14b276373bb1c2cda.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/8742903841a49821523796220c48715f/6865153958a215d846b416aeeaeee45d8aed65782cc79b0fe52b81b9e663e709.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/c0c0eae68492ad1ad2ad10d1ad0b2a55/c16e52860e76634f04a52784a94b1d6654f399130737872be85f904460d47fc9.jpg}',
    10
  );
INSERT INTO products (
    id,
    category,
    title,
    description,
    price,
    images,
    quantity
  )
VALUES (
    uuid_generate_v4(),
    'TV',
    'Propaganda Box 5',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi, nobis, voluptates, sit doloribus repellendus natus saepe similique facilis ab deleniti dolor enim possimus voluptatem necessitatibus ad culpa odio? Pariatur inventore laudantium tenetur provident, facilis cumque blanditiis maxime ad non molestias deleniti qui sed eum quas nisi! Dolorem repudiandae delectus quos quisquam vel, sint eligendi rem sapiente. Officiis, ratione natus.',
    60,
    '{https://c.dns-shop.ru/thumb/st1/fit/500/500/0843f7fc1a1e45560fba418beefbe958/08397172c53b32a9277b7b3c0e866da597cc4fef289b5db996fac10cdf5cca0c.jpg,
     https://c.dns-shop.ru/thumb/st1/fit/500/500/f484c075e736a714eb0edcf1ff16f92a/2068f8ff83e72e817c35451f185f58d6c986daeffb0c083388c8a72a06f94662.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/5803c1cc29d7bb563c32e07323b10225/414cba8fc174fdf2e743a0fe3ed4f28b3ce1dcecb73a51a14b276373bb1c2cda.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/8742903841a49821523796220c48715f/6865153958a215d846b416aeeaeee45d8aed65782cc79b0fe52b81b9e663e709.jpg,
     https://c.dns-shop.ru/thumb/st4/fit/500/500/c0c0eae68492ad1ad2ad10d1ad0b2a55/c16e52860e76634f04a52784a94b1d6654f399130737872be85f904460d47fc9.jpg}',
    10
  );