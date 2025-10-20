export function useCurrentLocation() {
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Twoja przeglądarka nie obsługuje geolokalizacji.')
        return
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords
          let location = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
            const data = await res.json()
            if (data?.address?.city || data?.address?.town) {
              location = data.address.city || data.address.town
            }
          } catch (err) {
            console.warn('Nie udało się pobrać nazwy miasta:', err)
          }

          resolve(location)
        },
        (err) => {
          console.error('Błąd geolokalizacji:', err)
          reject('Nie udało się uzyskać lokalizacji.')
        },
        { enableHighAccuracy: true }
      )
    })
  }

  return { getLocation }
}