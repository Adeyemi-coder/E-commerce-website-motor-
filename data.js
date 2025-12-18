// js/data.js - COMPLETE INVENTORY (9 CARS)

const carProducts = [
    // --- 1. Mercedes-Benz ---
    {
        id: 'km-001',
        name: 'S-Class S 580 Sedan',
        brand: 'Mercedes-Benz',
        model: 'S-Class',
        year: 2024,
        price: 125000,
        images: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 1500,
        colorOptions: ['Obsidian Black', 'Emerald Green', 'Polar White'],
        description: 'The pinnacle of automotive engineering.',
        featured: true,
        specs: {
            engine: '4.0L V8 Biturbo',
            horsepower: '496 hp',
            acceleration: '4.4s',
            topSpeed: '130 mph',
            transmission: '9G-TRONIC',
        },
    },
    // --- 2. Rolls-Royce ---
    {
        id: 'km-002',
        name: 'Phantom Extended',
        brand: 'Rolls-Royce',
        model: 'Phantom',
        year: 2023,
        price: 550000,
        images: [
            'phatom.jpg',
            'https://images.unsplash.com/photo-1633511048186-237a26eb2627?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 50,
        colorOptions: ['Midnight Sapphire', 'English White', 'Tungsten'],
        description: 'The ultimate expression of bespoke luxury.',
        featured: true,
        specs: {
            engine: '6.75L V12',
            horsepower: '563 hp',
            acceleration: '5.1s',
            topSpeed: '155 mph',
            transmission: '8-speed Auto',
        },
    },
    // --- 3. Tesla ---
    {
        id: 'km-003',
        name: 'Model S Plaid',
        brand: 'Tesla',
        model: 'Model S',
        year: 2024,
        price: 95000,
        images: [
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Electric',
        transmission: 'Automatic',
        mileage: 500,
        colorOptions: ['Solid Black', 'Deep Blue', 'Red Multi-Coat'],
        description: 'Unrivaled acceleration and range.',
        featured: false,
        specs: {
            engine: 'Tri-Motor AWD',
            horsepower: '1020 hp',
            acceleration: '1.99s',
            topSpeed: '200 mph',
            transmission: '1-Speed',
        },
    },
    // --- 4. Maserati ---
    {
        id: 'km-004',
        name: 'Ghibli Trofeo',
        brand: 'Maserati',
        model: 'Ghibli',
        year: 2023,
        price: 110000,
        images: [
            'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 3000,
        colorOptions: ['Bianco Alpi', 'Nero Ribelle', 'Blu Passione'],
        description: 'Italian flair meets raw V8 power.',
        featured: true,
        specs: {
            engine: '3.8L Twin-Turbo V8',
            horsepower: '580 hp',
            acceleration: '4.0s',
            topSpeed: '203 mph',
            transmission: 'ZF 8-speed',
        },
    },
    // --- 5. Aston Martin ---
    {
        id: 'km-005',
        name: 'DB11 V8 Coupe',
        brand: 'Aston Martin',
        model: 'DB11',
        year: 2022,
        price: 185000,
        images: [
            'aushion.jpg',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 8000,
        colorOptions: ['Skyfall Silver', 'Stirling Green', 'Xenon Grey'],
        description: 'A masterpiece of proportion and power.',
        featured: false,
        specs: {
            engine: '4.0L Twin-Turbo V8',
            horsepower: '528 hp',
            acceleration: '3.9s',
            topSpeed: '192 mph',
            transmission: 'ZF 8-speed',
        },
    },
    // --- 6. Ferrari (NEW) ---
    {
        id: 'km-006',
        name: 'F8 Tributo',
        brand: 'Ferrari',
        model: 'F8',
        year: 2023,
        price: 325000,
        images: [
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1000&auto=format&fit=crop',
            'ferrari.jpg',
            'ferrari2.jpg'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 900,
        colorOptions: ['Rosso Corsa', 'Giallo Modena', 'Nero'],
        description: 'Homage to the most powerful V8 in Ferrari history.',
        featured: true,
        specs: {
            engine: '3.9L Twin-Turbo V8',
            horsepower: '710 hp',
            acceleration: '2.9s',
            topSpeed: '211 mph',
            transmission: '7-speed F1',
        },
    },
    // --- 7. Lamborghini (NEW) ---
    {
        id: 'km-007',
        name: 'Huracán EVO',
        brand: 'Lamborghini',
        model: 'Huracán',
        year: 2024,
        price: 295000,
        images: [
            'lambo.jpg',
            'lambo2.jpg',
            'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 1200,
        colorOptions: ['Verde Mantis', 'Arancio Borealis', 'Bianco'],
        description: 'The evolution of the most successful V10 Lamborghini.',
        featured: true,
        specs: {
            engine: '5.2L V10',
            horsepower: '631 hp',
            acceleration: '3.1s',
            topSpeed: '202 mph',
            transmission: '7-speed LDF',
        },
    },
    // --- 8. Porsche (NEW) ---
    {
        id: 'km-008',
        name: '911 GT3 RS',
        brand: 'Porsche',
        model: '911',
        year: 2024,
        price: 285000,
        images: [
            'Porsche.jpg',
            'Porsche1.jpg',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 450,
        colorOptions: ['Guards Red', 'Racing Yellow', 'Python Green'],
        description: 'A race car for the road. The ultimate 911.',
        featured: false,
        specs: {
            engine: '4.0L Flat-6',
            horsepower: '518 hp',
            acceleration: '3.0s',
            topSpeed: '184 mph',
            transmission: '7-speed PDK',
        },
    },
    // --- 9. Bentley (NEW) ---
    {
        id: 'km-009',
        name: 'Continental GT',
        brand: 'Bentley',
        model: 'Continental',
        year: 2023,
        price: 345000,
        images: [
            'bently.jpg',
            'bently2.jpg',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop'
        ],
        fuel: 'Gasoline',
        transmission: 'Automatic',
        mileage: 2100,
        colorOptions: ['Beluga Black', 'Dark Sapphire', 'Glacier White'],
        description: 'The most dynamic road car in Bentley’s 101 year history.',
        featured: true,
        specs: {
            engine: '6.0L W12',
            horsepower: '650 hp',
            acceleration: '3.5s',
            topSpeed: '208 mph',
            transmission: '8-speed Dual',
        },
    }
];