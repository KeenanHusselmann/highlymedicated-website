const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');

// Database is at the root of the project, not in /prisma
const dbPath = path.join(__dirname, '..', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.blogPost.deleteMany();

  // Categories
  const ointments = await prisma.category.create({
    data: {
      name: 'Healing Ointments',
      slug: 'healing-ointments',
      description: 'Premium cannabis-infused healing ointments and salves crafted with natural ingredients.',
      image: '/assets/categories/ointments.jpg',
    },
  });

  const apparel = await prisma.category.create({
    data: {
      name: 'Apparel',
      slug: 'apparel',
      description: 'Premium branded clothing and accessories for the conscious community.',
      image: '/assets/categories/apparel.jpg',
    },
  });

  const merch = await prisma.category.create({
    data: {
      name: 'Merchandise',
      slug: 'merchandise',
      description: 'Exclusive Highly Medicated merchandise and accessories.',
      image: '/assets/categories/merchandise.jpg',
    },
  });

  // Products
  await prisma.product.create({
    data: {
      name: 'CannaSalve Original',
      slug: 'cannasalve-original',
      description: 'Our signature healing ointment made with premium cannabis extract and essential oils. Perfect for daily relief and skin nourishment.',
      longDescription: 'CannaSalve Original is our flagship product, carefully formulated with premium cannabis extract, beeswax, coconut oil, and a blend of essential oils including lavender, eucalyptus, and tea tree. Each batch is handmade in small quantities to ensure the highest quality and potency.\n\nThis versatile ointment is designed for topical application and can be used for muscle relief, skin nourishment, and general wellness. The natural anti-inflammatory properties of cannabis combined with our proprietary essential oil blend create a soothing experience that your body will thank you for.\n\nSuitable for all skin types. For external use only.',
      price: 350,
      sku: 'CS-001',
      stock: 50,
      images: '[]',
      categoryId: ointments.id,
      featured: true,
      weight: '50ml',
      ingredients: 'Cannabis extract, Beeswax, Coconut oil, Lavender essential oil, Eucalyptus essential oil, Tea tree essential oil, Vitamin E',
      usage: 'Apply a small amount to the affected area and massage gently. Use 2-3 times daily or as needed. For external use only.',
      benefits: 'Natural pain relief, Anti-inflammatory, Skin nourishment, Muscle relaxation, Calming aromatherapy',
    },
  });

  await prisma.product.create({
    data: {
      name: 'CannaSalve Extra Strength',
      slug: 'cannasalve-extra-strength',
      description: 'Enhanced formula with double the cannabis extract for intensive relief. Ideal for those needing stronger therapeutic benefits.',
      longDescription: 'CannaSalve Extra Strength takes our beloved original formula and amplifies it with double the cannabis extract concentration. This powerful formulation is designed for those who need more intensive relief from chronic discomfort, deep muscle tension, and persistent skin conditions.\n\nEnriched with additional arnica, peppermint, and rosemary essential oils, this premium ointment provides a warming sensation that penetrates deep into tissue. The enhanced formula also includes shea butter for superior skin hydration.\n\nRecommended for experienced users who are familiar with topical cannabis products.',
      price: 550,
      sku: 'CS-002',
      stock: 30,
      images: '[]',
      categoryId: ointments.id,
      featured: true,
      weight: '50ml',
      ingredients: 'Double-strength cannabis extract, Beeswax, Coconut oil, Shea butter, Arnica, Peppermint essential oil, Rosemary essential oil, Vitamin E',
      usage: 'Apply a small amount to the affected area and massage thoroughly. Use 1-2 times daily. Not recommended for sensitive skin. For external use only.',
      benefits: 'Intensive pain relief, Deep muscle penetration, Anti-inflammatory, Enhanced skin healing, Warming therapeutic effect',
    },
  });

  await prisma.product.create({
    data: {
      name: 'HM Classic Tee',
      slug: 'hm-classic-tee',
      description: 'Premium cotton t-shirt featuring the iconic Highly Medicated logo. Comfortable, stylish, and represents the movement.',
      longDescription: 'The HM Classic Tee is more than just a t-shirt - it is a statement. Made from 100% premium combed cotton, this tee offers exceptional comfort and durability. The iconic Highly Medicated logo is screen-printed using eco-friendly inks that maintain their vibrancy wash after wash.\n\nDesigned with a relaxed fit that flatters all body types, this tee is perfect for everyday wear. Whether you are heading to the beach, meeting friends, or simply lounging at home, the HM Classic Tee has got you covered.',
      price: 299,
      sku: 'AP-001',
      stock: 100,
      images: '[]',
      categoryId: apparel.id,
      featured: true,
      weight: '200g',
      dimensions: 'Available in S, M, L, XL, XXL',
    },
  });

  await prisma.product.create({
    data: {
      name: 'HM Premium Hoodie',
      slug: 'hm-premium-hoodie',
      description: 'Cozy premium hoodie with embroidered HM branding. Stay warm while reppin\' the lifestyle.',
      longDescription: 'The HM Premium Hoodie is the ultimate comfort piece. Made from a heavyweight cotton-polyester blend, this hoodie features a brushed fleece interior that keeps you warm without overheating. The embroidered Highly Medicated logo on the chest adds a clean, premium touch.\n\nFeatures include a double-lined hood, kangaroo pocket, ribbed cuffs and hem, and YKK brass zipper. Available in our signature forest green colour.',
      price: 599,
      sku: 'AP-002',
      stock: 50,
      images: '[]',
      categoryId: apparel.id,
      featured: false,
      weight: '450g',
      dimensions: 'Available in S, M, L, XL, XXL',
    },
  });

  await prisma.product.create({
    data: {
      name: 'HM Rolling Tray',
      slug: 'hm-rolling-tray',
      description: 'Custom designed wooden rolling tray with laser-engraved HM branding. Functional and beautiful.',
      longDescription: 'The HM Rolling Tray is a beautifully crafted accessory made from sustainable bamboo. Each tray features a laser-engraved Highly Medicated logo and a smooth, food-grade finish. The curved edges prevent any spillage while the magnetic corners keep everything in place.\n\nDimensions: 25cm x 15cm x 2cm. Each tray is handmade and may have slight natural variations in the bamboo grain, making every piece unique.',
      price: 199,
      sku: 'MC-001',
      stock: 75,
      images: '[]',
      categoryId: merch.id,
      featured: true,
      weight: '300g',
      dimensions: '25cm x 15cm x 2cm',
    },
  });

  await prisma.product.create({
    data: {
      name: 'HM Sticker Pack',
      slug: 'hm-sticker-pack',
      description: 'Set of 5 premium vinyl stickers featuring various HM designs. Weather-resistant and perfect for laptops, bottles, and more.',
      longDescription: 'Deck out your gear with the HM Sticker Pack. This set includes 5 premium vinyl stickers featuring various Highly Medicated designs - from our classic logo to unique artistic interpretations of cannabis culture.\n\nEach sticker is made from weather-resistant, UV-protected vinyl that withstands the elements. Perfect for laptops, water bottles, skateboards, car windows, and more. The strong adhesive ensures they stay put.',
      price: 79,
      sku: 'MC-002',
      stock: 200,
      images: '[]',
      categoryId: merch.id,
      featured: false,
      weight: '50g',
    },
  });

  // Blog Posts
  await prisma.blogPost.create({
    data: {
      title: 'The Science Behind Cannabis Topicals',
      slug: 'science-behind-cannabis-topicals',
      excerpt: 'Discover how cannabis-infused topicals interact with your endocannabinoid system to provide natural relief and skin benefits.',
      content: 'Cannabis topicals have been used for centuries across various cultures for their therapeutic properties. Modern science is now catching up to what traditional healers have known for generations.\n\nThe human body contains an endocannabinoid system (ECS) with receptors throughout the skin, muscles, and nervous system. When cannabis-infused topicals are applied to the skin, the cannabinoids interact with localised CB1 and CB2 receptors without entering the bloodstream.\n\nThis localised interaction is what makes topicals so effective for targeted relief. The cannabinoids work with your body\'s natural systems to reduce inflammation, ease discomfort, and promote skin health.\n\nKey cannabinoids found in our products include CBD (cannabidiol) known for its anti-inflammatory and analgesic properties, and various terpenes that enhance the therapeutic effects through what scientists call the "entourage effect."\n\nAt Highly Medicated, we carefully formulate our CannaSalve products to maximise these natural interactions, combining premium cannabis extract with complementary essential oils for a holistic healing experience.',
      author: 'Highly Medicated',
      published: true,
      tags: 'cannabis,science,topicals,wellness,education',
    },
  });

  await prisma.blogPost.create({
    data: {
      title: 'Cannabis Laws in South Africa: What You Need to Know',
      slug: 'cannabis-laws-south-africa',
      excerpt: 'A comprehensive guide to the current legal landscape of cannabis in South Africa, from the Constitutional Court ruling to the Cannabis for Private Purposes Act.',
      content: 'South Africa made history in 2018 when the Constitutional Court ruled that the private use, possession, and cultivation of cannabis by adults is legal. This landmark ruling opened the door for a new era of cannabis wellness in the country.\n\nThe Cannabis for Private Purposes Act further clarified the legal framework, establishing guidelines for personal use while maintaining restrictions on public consumption and commercial sale of recreational cannabis.\n\nFor topical products like our CannaSalve range, the legal landscape is more straightforward. Cannabis-infused topicals that are designed for external use fall under different regulations than ingestible products.\n\nIt\'s important to note that while the legal framework continues to evolve, Highly Medicated operates in full compliance with all current South African laws and regulations. Our products are crafted for topical use and wellness purposes.\n\nWe encourage all our customers to stay informed about their rights and responsibilities regarding cannabis in South Africa. Knowledge is power, and an educated community is a stronger community.',
      author: 'Highly Medicated',
      published: true,
      tags: 'cannabis,law,south-africa,education,legal',
    },
  });

  await prisma.blogPost.create({
    data: {
      title: '5 Ways to Incorporate Cannabis Wellness Into Your Daily Routine',
      slug: 'cannabis-wellness-daily-routine',
      excerpt: 'Simple and practical tips for integrating cannabis wellness products into your everyday life for maximum benefit.',
      content: 'Incorporating cannabis wellness into your daily routine doesn\'t have to be complicated. Here are five simple ways to make the most of your Highly Medicated products.\n\n1. Morning Muscle Prep: Apply CannaSalve to joints and muscles before your morning exercise routine. The warming properties help prepare your body for movement and can reduce post-workout discomfort.\n\n2. Post-Shower Skin Care: After your shower, while skin is still slightly damp, apply a thin layer of CannaSalve to dry or problem areas. The moisture helps the product absorb more effectively.\n\n3. Midday Stress Relief: Keep a small tin at your desk. When tension builds in your neck and shoulders, a quick application with gentle massage can help you refocus and relax.\n\n4. Evening Wind-Down: Make CannaSalve part of your evening routine. Applying it to your temples, wrists, and feet before bed creates a calming ritual that signals your body it\'s time to rest.\n\n5. Weekend Self-Care: Dedicate time for a thorough application combined with meditation or gentle yoga. The aromatherapy benefits of the essential oils enhance the relaxation experience.\n\nRemember, consistency is key. The more regularly you incorporate these practices, the more benefits you\'ll experience over time.',
      author: 'Highly Medicated',
      published: true,
      tags: 'wellness,routine,self-care,tips,lifestyle',
    },
  });

  // Sample Reviews
  const products = await prisma.product.findMany();
  const cannaSalveOriginal = products.find(p => p.slug === 'cannasalve-original');
  const cannaSalveExtra = products.find(p => p.slug === 'cannasalve-extra-strength');

  if (cannaSalveOriginal) {
    await prisma.review.createMany({
      data: [
        {
          productId: cannaSalveOriginal.id,
          rating: 5,
          comment: 'This product has been a game changer for my chronic back pain. I apply it twice daily and the relief is incredible. Highly recommend!',
          authorName: 'Sarah M.',
          approved: true,
        },
        {
          productId: cannaSalveOriginal.id,
          rating: 4,
          comment: 'Really nice product. The smell is amazing and it absorbs well into the skin. Would be 5 stars but I wish the tin was a bit bigger for the price.',
          authorName: 'David K.',
          approved: true,
        },
        {
          productId: cannaSalveOriginal.id,
          rating: 5,
          comment: 'Been using this for my eczema and the results are remarkable. My skin has never felt this good. Thank you HM!',
          authorName: 'Nomsa T.',
          approved: true,
        },
      ],
    });
  }

  if (cannaSalveExtra) {
    await prisma.review.createMany({
      data: [
        {
          productId: cannaSalveExtra.id,
          rating: 5,
          comment: 'The extra strength version is exactly what I needed. I have arthritis in my hands and this gives me so much relief. Worth every cent.',
          authorName: 'Johan V.',
          approved: true,
        },
        {
          productId: cannaSalveExtra.id,
          rating: 5,
          comment: 'Stronger than the original but in the best way. You can really feel the warming effect. Perfect for after gym sessions.',
          authorName: 'Thandi N.',
          approved: true,
        },
      ],
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
