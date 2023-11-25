import { faker } from "@faker-js/faker";

export const generateProd = () => {
    return {
        _id: generateRandomId(24),
        title: faker.commerce.productMaterial(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 50, max: 2000 }),
        code: faker.string.alphanumeric(6),
        stock: faker.number.int(1000),
        category: faker.commerce.productAdjective(),
        status: true,
    }
}

function generateRandomId(length) {
    const characters = 'abcdef0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
    }

    return randomId;
}

