import CollectionCourses from '@/components/CollectionCourses/CollectionCourses'
import HeaderNav from '@/components/HeaderNav/HeaderNav'
import HeroSection from '@/components/HeroSection/HeroSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeaderNav />
      <HeroSection />
      <CollectionCourses />
    </div>
  )
}

export default page