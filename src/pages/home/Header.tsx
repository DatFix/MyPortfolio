import ThemeToggle from "../../components/ThemeToggle";

export default function Header() {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <div className="py-3 sticky top-0 dark:bg-black bg-gray-100 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end gap-10">
          {navLinks.map((item, index) => (
            <a href={`${item.href}`} key={index} className="dark:text-white transition-all duration-200 italic font-mono text-lg">{item.name}</a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
