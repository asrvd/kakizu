export default function Footer() {
  return (
    <footer className="text-foreground p-4 text-center border-t border-border">
      <p>
        Created by{" "}
        <a
          className="font-semibold underline decoration-wavy"
          href="https://twitter.com/_asheeshh"
          target="_blank"
          rel="noreferrer noopener"
        >
          ashish
        </a>{" "}
        for the{" "}
        <a
          className="font-semibold underline decoration-wavy"
          href="https://dev.to/challenges/cloudflare"
          target="_blank"
          rel="noreferrer noopener"
        >
          Cloudflare x Dev Challenge
        </a>
      </p>
    </footer>
  );
}
