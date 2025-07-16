import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Home,
  Briefcase,
  Calendar,
  Shield,
  Settings,
  User,
  FolderOpen,
  Mail,
} from "lucide-react";

const defaultItems = [
  { label: "home", icon: Home, path: "/" },
  { label: "about", icon: User, path: "/about" },
  { label: "projects", icon: FolderOpen, path: "/projects" },
  { label: "contact", icon: Mail, path: "/contact" },
];

const defaultAccentColor = "var(--component-active-color-default)";

const InteractiveMenu = ({ items, accentColor, onItemClick }) => {
  const finalItems = useMemo(() => {
    const isValid =
      items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
    if (!isValid) {
      console.warn(
        "InteractiveMenu: 'items' prop is invalid or missing. Using default items.",
        items
      );
      return defaultItems;
    }
    return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= finalItems.length) {
      setActiveIndex(0);
    }
  }, [finalItems, activeIndex]);

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];
      if (activeItemElement && activeTextElement) {
        const textWidth = activeTextElement.offsetWidth;
        activeItemElement.style.setProperty("--lineWidth", `${textWidth}px`);
      }
    };

    setLineWidth();
    window.addEventListener("resize", setLineWidth);
    return () => {
      window.removeEventListener("resize", setLineWidth);
    };
  }, [activeIndex, finalItems]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (onItemClick) {
      onItemClick(finalItems[index], index);
    }
  };

  const navStyle = useMemo(() => {
    const activeColor = accentColor || defaultAccentColor;
    return { "--component-active-color": activeColor };
  }, [accentColor]);

  return (
    <nav className="menu" role="navigation" style={navStyle}>
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const isTextActive = isActive;
        const IconComponent = item.icon;

        return (
          <button
            key={item.label}
            className={`menu__item ${isActive ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ "--lineWidth": "0px" }}
          >
            <div className="menu__icon">
              <IconComponent className="icon" />
            </div>
            <strong
              className={`menu__text ${isTextActive ? "active" : ""}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              {item.label}
            </strong>
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
