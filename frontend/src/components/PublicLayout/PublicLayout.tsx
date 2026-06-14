import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import MarqueeBar from '../MarqueeBar/MarqueeBar';
import { useSettings } from '../../context/SettingsContext';

export default function PublicLayout() {
  const { enableMarqueeBar } = useSettings();

  return (
    <>
      <Navbar />
      {enableMarqueeBar && <MarqueeBar />}
      <Outlet />
    </>
  );
}
