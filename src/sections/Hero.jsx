import React, { useState, useEffect, useRef } from 'react'
import backgroundImage from '../assets/me 2.png'
import defaultBannerImage from '../assets/me.png'

export default function Hero() {
  const [displayText, setDisplayText] = useState("I'm Freelancer")
  const [nextText, setNextText] = useState("I'm Designer")
  const [isAnimating, setIsAnimating] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [offsetY, setOffsetY] = useState(0)
  const [banners, setBanners] = useState([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const parallaxRef = useRef(null)
  const videoRefs = useRef({})
  const slideTimeoutRef = useRef(null)
  const isInitialLoad = useRef(true)
  const currentIndexRef = useRef(0)
  const professions = ["Freelancer", "Designer", "Jr. Developer", "UI/UX Designer", "Web Developer", "Frontend Developer", "Backend Developer"]

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home-banner')
        if (response.ok) {
          const data = await response.json()
          // Always add default banner as first item
          const defaultBanner = {
            id: 'default',
            title: '',
            subtitle: '',
            media: defaultBannerImage,
            media_type: 'image'
          }
          
          if (Array.isArray(data) && data.length > 0) {
            // Accept ALL banners that have media - no strict filtering
            const validBanners = data.filter(banner => {
              // Only check if media exists and is not empty
              const hasMedia = banner.media && 
                              typeof banner.media === 'string' && 
                              banner.media.trim().length > 0
              
              return hasMedia
            })
            
            // Add default banner at the beginning
            const allBanners = [defaultBanner, ...validBanners]
            
            // Only reset index on initial load
            if (isInitialLoad.current) {
              // If there are API banners, start from index 1 (first API banner) instead of 0 (default)
              if (validBanners.length > 0) {
                currentIndexRef.current = 1
                setCurrentBannerIndex(1)
              } else {
                currentIndexRef.current = 0
                setCurrentBannerIndex(0)
              }
              isInitialLoad.current = false
            } else {
              // On subsequent updates, preserve index but ensure it's within bounds
              const prevIndex = currentIndexRef.current
              const newIndex = Math.min(prevIndex, allBanners.length - 1)
              if (newIndex !== prevIndex) {
                currentIndexRef.current = newIndex
                setCurrentBannerIndex(newIndex)
              }
            }
            
            setBanners(allBanners)
          } else {
            // If no banners from API, use only default
            setBanners([defaultBanner])
            if (isInitialLoad.current) {
              currentIndexRef.current = 0
              setCurrentBannerIndex(0)
              isInitialLoad.current = false
            }
          }
        } else {
          // If API fails, use default banner
          setBanners([{
            id: 'default',
            title: '',
            subtitle: '',
            media: defaultBannerImage,
            media_type: 'image'
          }])
          if (isInitialLoad.current) {
            currentIndexRef.current = 0
            setCurrentBannerIndex(0)
            isInitialLoad.current = false
          }
        }
      } catch (error) {
        // On error, use default banner
        setBanners([{
          id: 'default',
          title: '',
          subtitle: '',
          media: defaultBannerImage,
          media_type: 'image'
        }])
        if (isInitialLoad.current) {
          currentIndexRef.current = 0
          setCurrentBannerIndex(0)
          isInitialLoad.current = false
        }
      }
    }
    fetchBanners()
    
    // Refresh banners every 2 seconds to get new uploads immediately
    const refreshInterval = setInterval(fetchBanners, 2000)
    return () => clearInterval(refreshInterval)
  }, [])

  // Auto-slide banners - 2 seconds for images, video duration for videos
  useEffect(() => {
    if (banners.length <= 1) return

    // Clear any existing timeout
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current)
    }

    const currentBanner = banners[currentBannerIndex]
    const isVideo = currentBanner?.media_type === 'video'
    
    if (isVideo) {
      // For video, wait for video to end
      const videoElement = videoRefs.current[currentBannerIndex]
      
      if (videoElement) {
        const handleVideoEnd = () => {
          setCurrentBannerIndex((prev) => {
            const nextIndex = (prev + 1) % banners.length
            currentIndexRef.current = nextIndex
            return nextIndex
          })
        }
        
        // Wait for video to end
        videoElement.addEventListener('ended', handleVideoEnd, { once: true })
        
        // Fallback: if video duration is available, use it
        if (videoElement.duration && !isNaN(videoElement.duration)) {
          const duration = videoElement.duration * 1000 // Convert to milliseconds
          slideTimeoutRef.current = setTimeout(() => {
            setCurrentBannerIndex((prev) => {
              const nextIndex = (prev + 1) % banners.length
              currentIndexRef.current = nextIndex
              return nextIndex
            })
          }, duration)
        } else {
          // Wait for metadata to load
          const handleLoadedMetadata = () => {
            const duration = videoElement.duration * 1000
            if (duration > 0) {
              slideTimeoutRef.current = setTimeout(() => {
                setCurrentBannerIndex((prev) => {
                  const nextIndex = (prev + 1) % banners.length
                  currentIndexRef.current = nextIndex
                  return nextIndex
                })
              }, duration)
            }
          }
          videoElement.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
        }
        
        return () => {
          videoElement.removeEventListener('ended', handleVideoEnd)
          if (slideTimeoutRef.current) {
            clearTimeout(slideTimeoutRef.current)
          }
        }
      } else {
        // Video element not ready yet, wait a bit and retry
        slideTimeoutRef.current = setTimeout(() => {
          // Retry after a short delay
          const retryVideo = videoRefs.current[currentBannerIndex]
          if (retryVideo && retryVideo.duration) {
            const duration = retryVideo.duration * 1000
            slideTimeoutRef.current = setTimeout(() => {
              setCurrentBannerIndex((prev) => {
                const nextIndex = (prev + 1) % banners.length
                currentIndexRef.current = nextIndex
                return nextIndex
              })
            }, duration)
          } else {
            // Fallback to 2 seconds if video not ready
            slideTimeoutRef.current = setTimeout(() => {
              setCurrentBannerIndex((prev) => {
                const nextIndex = (prev + 1) % banners.length
                currentIndexRef.current = nextIndex
                return nextIndex
              })
            }, 2000)
          }
        }, 500)
      }
    } else {
        // For images, use 2 seconds
        slideTimeoutRef.current = setTimeout(() => {
          setCurrentBannerIndex((prev) => {
            const nextIndex = (prev + 1) % banners.length
            currentIndexRef.current = nextIndex
            return nextIndex
          })
        }, 2000)
      }

    return () => {
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current)
      }
    }
  }, [banners, currentBannerIndex])

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      setIsAnimating(true)
      setShowNext(false)
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % professions.length
        setNextText(`I'm ${professions[currentIndex]}`)
        setShowNext(true)
        
        setTimeout(() => {
          setDisplayText(`I'm ${professions[currentIndex]}`)
          setIsAnimating(false)
          setShowNext(false)
        }, 400)
      }, 50)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        setOffsetY(scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get current banner or fallback
  const currentBanner = banners.length > 0 ? banners[currentBannerIndex] : null
  const backgroundImg = currentBanner?.media || backgroundImage

  return (
    <section 
      ref={parallaxRef}
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Sliding Banner Background - Left to Right Smooth Slide */}
      <div className="absolute inset-0 overflow-hidden" style={{ height: '100vh', width: '100%', zIndex: 0 }}>
        {banners.length > 0 ? (
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${banners.length * 100}%`,
              transform: `translateX(-${currentBannerIndex * (100 / banners.length)}%)`,
              height: '100vh',
            }}
          >
            {banners.map((banner, index) => {
              return (
              <div
                key={banner.id || index}
                className="relative w-full"
                style={{
                  width: `${100 / banners.length}%`,
                  minWidth: `${100 / banners.length}%`,
                  height: '100vh',
                  flexShrink: 0,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  className="absolute inset-0 w-full"
                  style={{
                    height: '100vh',
                    width: '100%',
                    transform: `translateY(${offsetY * 0.5}px)`,
                    willChange: 'transform',
                    zIndex: 0,
                  }}
                >
                  {banner.media && (banner.media_type !== 'video' || !banner.media_type) ? (
                    <img
                      key={`banner-img-${banner.id || index}-${index}`}
                      src={banner.media}
                      alt={banner.title || 'Banner'}
                      className="w-full h-full object-cover"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100vh',
                        minHeight: '100vh',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                      }}
                      loading="eager"
                      onError={(e) => {
                        // Show error placeholder but keep trying
                        e.target.style.backgroundColor = '#1a1a1a'
                        e.target.style.display = 'flex'
                        e.target.style.alignItems = 'center'
                        e.target.style.justifyContent = 'center'
                      }}
                    />
                  ) : null}
                  {banner.media_type === 'video' && (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el
                      }}
                      className="w-full h-full object-cover"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100vh',
                        minHeight: '100vh',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                      }}
                      src={banner.media}
                      autoPlay
                      muted
                      playsInline
                      onLoadedMetadata={(e) => {
                        // Video metadata loaded, duration is available
                      }}
                    />
                  )}
                </div>
              </div>
            )
            })}
          </div>
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${defaultBannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${offsetY * 0.5}px)`,
              willChange: 'transform',
              height: '120%',
              width: '100%',
              top: '-10%',
            }}
          />
        )}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Banner Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                currentIndexRef.current = index
                setCurrentBannerIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBannerIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20 pt-32 md:pt-48 lg:pt-60">
        <div className="max-w-4xl">
          {/* Dynamic Title from Banner */}
          {currentBanner?.title ? (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="glow-brackets-hero">&lt; </span>
              {currentBanner.title}
              <span className="glow-brackets-hero">  /&gt;</span>
            </h1>
          ) : (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="glow-brackets-hero">&lt; </span>
              Manish Kumar
              <span className="glow-brackets-hero">  /&gt;</span>
            </h1>
          )}
          
          {/* Dynamic Subtitle from Banner */}
          {currentBanner?.subtitle ? (
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              <span className="glow-brackets-hero">&lt; </span>
              {currentBanner.subtitle}
              <span className="glow-brackets-hero">  /&gt;</span>
            </h2>
          ) : (
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 overflow-hidden">
              <div className="relative h-[1.2em]">
                <span 
                  className={`inline-block absolute left-0 right-0 ${
                    isAnimating && !showNext ? 'animate-slide-out' : 
                    showNext ? 'animate-slide-in' : ''
                  }`}
                >
                  <span className="glow-brackets-hero">&lt; </span>
                  {showNext ? nextText : displayText}
                  <span className="glow-brackets-hero">  /&gt;</span>
                </span>
              </div>
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
