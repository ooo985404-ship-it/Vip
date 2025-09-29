export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/70">
        <p>&copy; {new Date().getFullYear()} بسيطة. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-4">
          <a href="#popular" className="hover:text-foreground">الأكثر شعبية</a>
          <a href="#offers" className="hover:text-foreground">العروض</a>
        </div>
      </div>
    </footer>
  );
}
