import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <circle cx="145" cy="115" r="110" /> 
    <rect x="8" y="382" rx="0" ry="0" width="74" height="29" /> 
    <rect x="146" y="376" rx="0" ry="0" width="130" height="40" /> 
    <rect x="12" y="244" rx="0" ry="0" width="270" height="33" /> 
    <rect x="13" y="300" rx="0" ry="0" width="270" height="60" />
  </ContentLoader>
)

export default Skeleton