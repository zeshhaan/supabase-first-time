import "tailwindcss/tailwind.css";
import { supabase } from "../utils/supabaseClient";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
