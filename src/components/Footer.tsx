export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-700 text-white text-center py-3 text-sm">
      <p>
        © {new Date().getFullYear()} MyLibrary. All rights reserved. | 
        Contact: purwita165@gmail.com | +62 818-184-544
      </p>
    </footer>
  )
}
