import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonLoader = (props) => (
    <ContentLoader
        speed={2}
        width={250}
        height={50}
        viewBox="0 0 250 50"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="64" y="39" rx="3" ry="3" width="200" height="6" />
        <circle cx="28" cy="27" r="20" />
        <rect x="66" y="14" rx="0" ry="0" width="201" height="19" />
    </ContentLoader>
)

export default SkeletonLoader