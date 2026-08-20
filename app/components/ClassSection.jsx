
'use client'
import React from 'react'
import { useState } from 'react'
import ClassCard from './ClassCard'
import Button from './Button'
import EnrollmentForm from './EnrollmentForm'
import { classesData } from '../data/classesData'

const ClassSection = () => {
      const [visibleClasses, setVisibleClasses] = useState(8);
    
      const handleViewMore = () => {
        const totalClasses = classesData.length;
        const nextCount = visibleClasses + 8;
        const remainingAfterNext = totalClasses - nextCount;
    
        if (remainingAfterNext < 3) {
          setVisibleClasses(totalClasses);
        } else {
          setVisibleClasses(nextCount);
        }
    };
    
  return (
      <section id='classes' className="bg-[#FBF4EC] py-12 pt-24 md:py-20 md:pt-26">
          <div className="max-w-[1395px] mx-auto px-5 md:px-8">

              {/* Heading */}
              <div className="flex items-center justify-between mb-10 md:mb-16">
                  <h2 className="text-4xl md:text-5xl text-primary font-primary">
                      Classes We Offer
                  </h2>
              </div>

              {/* Two-column layout: cards left, form right */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                  {/* Cards Grid */}
                  <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-y-16 justify-items-center">
                          {classesData.slice(0, visibleClasses).map((cls, index) => (
                              <ClassCard key={index} {...cls} />
                          ))}
                      </div>

                      {visibleClasses < classesData.length && (
                          <div className="flex justify-center mt-10 w-full">
                              <Button onClick={handleViewMore} variant="outlinePrimary" className="w-fit">View More</Button>
                          </div>
                      )}
                  </div>

                  {/* Enrollment Form — sticky on desktop */}
                  <div className="lg:w-1/3 w-full lg:sticky lg:top-24">
                      <EnrollmentForm
                          courseLabel="Class Interested In?"
                          coursePlaceholder="E.g., Tanjore Painting, Resin Art..."
                      />
                  </div>

              </div>
          </div>
      </section>
  )
}

export default ClassSection