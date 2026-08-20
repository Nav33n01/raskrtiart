"use client";

import React, { useState } from 'react'
import Carousel from './components/carausal'
import ExploreArtworks from './components/ExploreArtworks'
import ProductCard from './components/ProductCard'
import ArtGallery from './components/ArtGallery'
import EventCarousel from './components/events'
import FounderSection from './components/FounderSection'
import ContactUs from './components/contactUs'
import Footer from './components/footer'
import Button from './components/Button';
import Testimonials from './components/Testimonials'
import BulkOrderModal from './components/BulkOrderModal'
import EnrollmentForm from './components/EnrollmentForm'
import { storeProducts } from './data/storeData'
import CoursesOffer from './components/CourseSection'
import ClassSection from './components/ClassSection'
import AboutSection from './components/about'
import WhatsAppChat from './components/WhatsAppChat'


import WelcomeModal from './components/WelcomeModal'

const Page = () => {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  return (
    <div>
      {/* ============Welcome Visitor Popup Modal============ */}
      <WelcomeModal />

      {/* ============Carousel Section============ */}
      <Carousel />


      {/* ============About Section============ */}
      <AboutSection />


      {/* ============BULK ORDERS BANNER============ */}
      <section
        className='relative w-full h-[250px] md:h-[450px] flex flex-col items-center justify-center gap-8'
        style={{ backgroundImage: 'url("/banner-bg.jpeg")', backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* overlay */}
        <div className='bg-primary/70 absolute top-0 bottom-0 left-0 z-0 right-0' />

        <div className='px-10 relative z-10 flex flex-col items-center gap-6 text-center'>
          {/* Primary CTA — opens Bulk Order modal */}
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className='text-4xl md:text-6xl font-primary text-white hover:text-[#f0c97e] transition-colors duration-300 cursor-pointer underline-offset-4 hover:underline'
            aria-label="Open bulk order enquiry form"
            suppressHydrationWarning
          >
            Contact for Bulk Orders
          </button>

          {/* Additional content can be added here in the future */}

          {/* Explore button — opens brochure */}
          <Button
            variant="outlineWhite"
            className="mt-2"
            onClick={() => {
              // TODO: Replace '#' with the actual brochure PDF path once file is provided
              // e.g., window.open('/brochure/bulk-orders-brochure.pdf', '_blank')
              window.open('#', '_blank');
            }}
          >
            Explore
          </Button>
        </div>
      </section>

      {/* Bulk Order Modal */}
      <BulkOrderModal isOpen={isBulkModalOpen} onClose={() => setIsBulkModalOpen(false)} />


      {/* ============Courses Section============ */}
      <CoursesOffer />


      {/* ============Classes Section============ */}
      <ClassSection />


      {/* ============STORE BANNER============ */}
      <ExploreArtworks />


      {/* ============STORE / BUY ARTWORKS SECTION============ */}
      <section id='store' className="md:max-w-[1395px] md:mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left Column — Product Grids */}
          <div className="lg:w-2/3 w-full">

            {/* Buy Artworks */}
            <div className="mb-14">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl md:text-5xl text-primary font-primary">
                  Buy Artworks
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                {storeProducts
                  .filter(product => product.category != "Rajasthani Miniature")
                  .map((product, index) => (
                  <ProductCard key={index} productDetails={{
                    title: product.title,
                    artist: product.artist,
                    size: product.dimensions,
                    price: product.price,
                    image: product.imageData.mainImage.src,
                    slug: product.slug
                  }} />
                ))}
              </div>
            </div>

            {/* Buy Miniature Artworks */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl md:text-5xl text-primary font-primary">
                  Buy Miniature Artworks
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                {storeProducts
                  .filter(product => product.category === "Rajasthani Miniature")
                  .map((product, index) => (
                  <ProductCard key={index} productDetails={{
                    title: product.title,
                    artist: product.artist,
                    size: product.dimensions,
                    price: product.price,
                    image: product.imageData.mainImage.src,
                    slug: product.slug
                  }} />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column — Artwork Inquiry Form */}
          <div className="lg:w-1/3 w-full lg:sticky lg:top-24 mt-10 lg:mt-0">
            <EnrollmentForm
              formTitle="Buy Artwork"
              courseLabel="What You Want to Know?"
              coursePlaceholder="E.g., Artwork dimensions, custom painting..."
            />
          </div>

        </div>
      </section>

      <EventCarousel />
      <Testimonials />
      <FounderSection />
      <ArtGallery />
      <ContactUs />
      
    </div>
  )
}

export default Page
