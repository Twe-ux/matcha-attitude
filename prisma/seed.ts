import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Nettoyer la base de données
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.address.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Créer des utilisateurs
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@matcha.com',
      name: 'Administrateur',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const testUser = await prisma.user.create({
    data: {
      email: 'user@matcha.com',
      name: 'Utilisateur Test',
      password: hashedPassword,
      role: 'USER',
    },
  })

  console.log('✅ Utilisateurs créés')

  // Créer des catégories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Thés Matcha',
        description: 'Thés matcha japonais authentiques de qualité premium',
        image: 'https://images.unsplash.com/photo-1564890273748-0ad866f8a4b8?w=300',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessoires',
        description: 'Accessoires traditionnels pour la cérémonie du thé',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Coffrets',
        description: 'Coffrets cadeaux et sets de dégustation',
        image: 'https://images.unsplash.com/photo-1549443021-1f6681d2681b?w=300',
      },
    }),
  ])

  console.log('✅ Catégories créées')

  // Créer des produits
  const products = [
    {
      name: 'Matcha Cérémonie Premium',
      description: 'Thé matcha japonais de grade cérémonie, cultivé à Uji. Saveur umami intense et couleur jade éclatante.',
      price: 45.99,
      stock: 25,
      featured: true,
      categoryId: categories[0].id,
      images: [
        'https://images.unsplash.com/photo-1564890273748-0ad866f8a4b8?w=500',
        'https://images.unsplash.com/photo-1563822249548-7c78ac2c3b78?w=500'
      ],
    },
    {
      name: 'Matcha Culinaire Bio',
      description: 'Matcha biologique parfait pour la cuisine et les boissons. Goût équilibré et prix accessible.',
      price: 24.99,
      stock: 40,
      featured: false,
      categoryId: categories[0].id,
      images: [
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500'
      ],
    },
    {
      name: 'Fouet Chasen Traditionnel',
      description: 'Fouet en bambou artisanal avec 80 dents pour préparer le matcha parfait.',
      price: 28.50,
      stock: 15,
      featured: true,
      categoryId: categories[1].id,
      images: [
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500'
      ],
    },
    {
      name: 'Bol Chawan Céramique',
      description: 'Bol traditionnel japonais en céramique pour la cérémonie du thé matcha.',
      price: 35.00,
      stock: 12,
      featured: false,
      categoryId: categories[1].id,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
      ],
    },
    {
      name: 'Cuillère Chashaku Bambou',
      description: 'Cuillère de dosage traditionnelle en bambou pour mesurer le matcha.',
      price: 12.99,
      stock: 30,
      featured: false,
      categoryId: categories[1].id,
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
      ],
    },
    {
      name: 'Set Découverte Matcha',
      description: 'Coffret complet avec matcha premium, fouet, bol et cuillère. Parfait pour débuter.',
      price: 89.99,
      stock: 8,
      featured: true,
      categoryId: categories[2].id,
      images: [
        'https://images.unsplash.com/photo-1549443021-1f6681d2681b?w=500',
        'https://images.unsplash.com/photo-1564890273748-0ad866f8a4b8?w=500'
      ],
    },
    {
      name: 'Coffret Dégustation 3 Matchas',
      description: 'Sélection de 3 matchas différents pour découvrir les saveurs variées.',
      price: 67.50,
      stock: 10,
      featured: false,
      categoryId: categories[2].id,
      images: [
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500'
      ],
    },
  ]

  for (const productData of products) {
    await prisma.product.create({
      data: productData,
    })
  }

  console.log('✅ Produits créés')

  // Créer une adresse pour l'utilisateur test
  await prisma.address.create({
    data: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      isDefault: true,
      userId: testUser.id,
    },
  })

  console.log('✅ Adresse créée')
  console.log('🎉 Seeding terminé avec succès!')
  console.log('')
  console.log('Comptes de test créés:')
  console.log('👤 Admin: admin@matcha.com / password123')
  console.log('👤 User: user@matcha.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Erreur durant le seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
