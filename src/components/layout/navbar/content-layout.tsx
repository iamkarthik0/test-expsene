// This component provides a layout wrapper with a navigation bar and content area
// It takes a title string and child components as props
import { Navbar } from "./Navbar";

// Define the expected props for the ContentLayout component
interface ContentLayoutProps {
  title: string; // Title to display in the navbar
  children: React.ReactNode; // Child components to render in the content area
}

// ContentLayout component renders a page layout with navigation and content sections
export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      {/* Navbar component displays the page title and navigation controls */}
      <Navbar title={title} />

      {/* Content container with responsive padding */}
      <div className="container pt-8 pb-8 px-4 sm:px-8">
        {/* Render the child components passed to this layout */}
        {children}
      </div>
    </div>
  );
}
