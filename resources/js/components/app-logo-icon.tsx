import logo from '../../assets/icons/fav-icon.png'
export default function AppLogoIcon(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  return (
    <img
    className='className="w-20 h-20"'
      src={logo}
      alt="App Logo"
      {...props}
    />
  );
}