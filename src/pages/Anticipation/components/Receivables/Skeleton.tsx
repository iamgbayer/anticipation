import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={140}
    data-testid="skeleton"
    height={180}
    viewBox="0 0 140 180"
    backgroundColor="#5D9CEC"
    foregroundColor="#3D75BB"
  >
    <rect x="0" y="5" rx="6" ry="6" width="95" height="12" />
    <rect x="0" y="45" rx="5" ry="5" width="130" height="9" />
    <rect x="0" y="85" rx="5" ry="5" width="140" height="9" />
    <rect x="0" y="125" rx="5" ry="5" width="140" height="9" />
    <rect x="0" y="165" rx="5" ry="5" width="140" height="9" />
  </ContentLoader>
)
