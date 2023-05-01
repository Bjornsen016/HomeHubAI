import React, { useEffect, useState } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import styles from './Weather.module.css';
import { useTheme } from '@mui/material';

interface Location {
  latitude: number | null;
  longitude: number | null;
}
interface WeatherProps {
  isSmallView?: boolean;
}

const Weather: React.FC<WeatherProps> = ({ isSmallView = true }) => {
  const theme = useTheme();
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [locationName, setLocationName] = useState<string>('Your location');

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error('Error getting location:', error)
      );
    };

    getLocation();
  }, []);

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'be39c2840d85ea762047c50843b4d1c4',
    lat: location.latitude,
    lon: location.longitude,
    lang: 'en',
    unit: 'metric',
  });

  useEffect(() => {
    const fetchLocationName = async (latitude: number, longitude: number) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );

      if (response.ok) {
        const data = await response.json();
        setLocationName(data.address.village);
      } else {
        console.error('Failed to fetch location name');
      }
    };

    if (location.latitude && location.longitude) {
      fetchLocationName(location.latitude, location.longitude);
    }
  }, [location]);

  const customStyles = {
    fontFamily: theme.typography.fontFamily,
    gradientStart: theme.palette.primary.main,
    gradientMid: theme.palette.primary.main,
    gradientEnd: theme.palette.primary.main,
    locationFontColor: theme.palette.primary.contrastText,
    todayTempFontColor: theme.palette.primary.contrastText,
    todayDateFontColor: theme.palette.primary.contrastText,
    todayRangeFontColor: theme.palette.primary.contrastText,
    todayDescFontColor: theme.palette.primary.contrastText,
    todayInfoFontColor: theme.palette.primary.contrastText,
    todayIconColor: theme.palette.primary.contrastText,
    forecastBackgroundColor: theme.palette.secondary.main,
    forecastSeparatorColor: theme.palette.divider,
    forecastDateColor: theme.palette.secondary.contrastText,
    forecastDescColor: theme.palette.secondary.contrastText,
    forecastRangeColor: theme.palette.secondary.contrastText,
    forecastIconColor: theme.palette.secondary.contrastText,
  };

  return (
    <div className={styles.weather}>
      {location.latitude && location.longitude && (
        <ReactWeather
          theme={customStyles}
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel={locationName}
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast={!isSmallView}
        />
      )}
    </div>
  );
};

export default Weather;
