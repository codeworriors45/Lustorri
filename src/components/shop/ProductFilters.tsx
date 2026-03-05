"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal, Check } from "lucide-react";
import { JewelryCategory, MetalType, getCategoryDisplayName, getMetalDisplayName } from "@/types/product";
import { universes } from "@/lib/data/universes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterState {
  categories: JewelryCategory[];
  universes: string[];
  metals: MetalType[];
  priceRange: [number, number];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalProducts: number;
}

const categories: JewelryCategory[] = ["rings", "necklaces", "earrings", "bracelets", "specials"];
const metals: MetalType[] = ["14k-yellow-gold", "14k-white-gold", "14k-rose-gold", "18k-yellow-gold", "18k-white-gold", "platinum"];
const priceRanges = [
  { label: "Under $1,000", value: [0, 999] as [number, number] },
  { label: "$1,000 - $1,500", value: [1000, 1500] as [number, number] },
  { label: "$1,500 - $2,000", value: [1500, 2000] as [number, number] },
  { label: "$2,000 - $2,500", value: [2000, 2500] as [number, number] },
  { label: "Over $2,500", value: [2500, 99999] as [number, number] },
];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Bestsellers", value: "bestseller" },
];

// Memoized FilterSection component
const FilterSection = memo(function FilterSection({
  title,
  id,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  id: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/50 py-2 my-2">
      <button
        onClick={() => onToggle(id)}
        className="flex items-center justify-between w-full text-left mb-2 group"
      >
        <span className="font-sans text-sm font-medium uppercase tracking-wider text-foreground">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Memoized checkbox item
const FilterCheckbox = memo(function FilterCheckbox({
  label,
  isChecked,
  onClick,
  color,
  suffix,
}: {
  label: string;
  isChecked: boolean;
  onClick: () => void;
  color?: string;
  suffix?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full py-2 px-3 text-left transition-colors duration-200 rounded",
        isChecked ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-foreground"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 border rounded flex items-center justify-center transition-colors",
          isChecked ? "bg-primary border-primary" : "border-border"
        )}
      >
        {isChecked && <Check className="w-3 h-3 text-white" />}
      </div>
      <div className="flex items-center gap-2 flex-1">
        {color && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="font-sans text-sm">{label}</span>
      </div>
      {suffix && (
        <span className="text-xs text-muted-foreground">{suffix}</span>
      )}
    </button>
  );
});

// Memoized radio item
const FilterRadio = memo(function FilterRadio({
  label,
  isChecked,
  onClick,
}: {
  label: string;
  isChecked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full py-2 px-3 text-left transition-colors duration-200 rounded",
        isChecked ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-foreground"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 border rounded-full flex items-center justify-center transition-colors",
          isChecked ? "bg-primary border-primary" : "border-border"
        )}
      >
        {isChecked && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span className="font-sans text-sm">{label}</span>
    </button>
  );
});

export function ProductFilters({ filters, onFilterChange, totalProducts }: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["category", "universe"]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  }, []);

  const toggleCategory = useCallback((category: JewelryCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  }, [filters, onFilterChange]);

  const toggleUniverse = useCallback((universeId: string) => {
    const newUniverses = filters.universes.includes(universeId)
      ? filters.universes.filter((u) => u !== universeId)
      : [...filters.universes, universeId];
    onFilterChange({ ...filters, universes: newUniverses });
  }, [filters, onFilterChange]);

  const toggleMetal = useCallback((metal: MetalType) => {
    const newMetals = filters.metals.includes(metal)
      ? filters.metals.filter((m) => m !== metal)
      : [...filters.metals, metal];
    onFilterChange({ ...filters, metals: newMetals });
  }, [filters, onFilterChange]);

  const setPriceRange = useCallback((range: [number, number]) => {
    onFilterChange({ ...filters, priceRange: range });
  }, [filters, onFilterChange]);

  const clearAllFilters = useCallback(() => {
    onFilterChange({
      categories: [],
      universes: [],
      metals: [],
      priceRange: [0, 99999],
      sortBy: "featured",
    });
  }, [onFilterChange]);

  const activeFilterCount =
    filters.categories.length +
    filters.universes.length +
    filters.metals.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 99999 ? 1 : 0);

  const filterContent = (
    <div className="space-y-1">
      {/* Categories */}
      <FilterSection
        title="Category"
        id="category"
        isExpanded={expandedSections.includes("category")}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {categories.map((category) => (
            <FilterCheckbox
              key={category}
              label={getCategoryDisplayName(category)}
              isChecked={filters.categories.includes(category)}
              onClick={() => toggleCategory(category)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Universes */}
      <FilterSection
        title="Universe"
        id="universe"
        isExpanded={expandedSections.includes("universe")}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {universes.map((universe) => (
            <FilterCheckbox
              key={universe.id}
              label={universe.name}
              isChecked={filters.universes.includes(universe.id)}
              onClick={() => toggleUniverse(universe.id)}
              color={universe.color}
              suffix={universe.type === "moment" ? "M" : "I"}
            />
          ))}
        </div>
      </FilterSection>

      {/* Metals */}
      <FilterSection
        title="Metal"
        id="metal"
        isExpanded={expandedSections.includes("metal")}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {metals.map((metal) => (
            <FilterCheckbox
              key={metal}
              label={getMetalDisplayName(metal)}
              isChecked={filters.metals.includes(metal)}
              onClick={() => toggleMetal(metal)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price"
        id="price"
        isExpanded={expandedSections.includes("price")}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <FilterRadio
              key={range.label}
              label={range.label}
              isChecked={
                filters.priceRange[0] === range.value[0] &&
                filters.priceRange[1] === range.value[1]
              }
              onClick={() => setPriceRange(range.value)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div
          className="sticky top-36 bg-background border border-border/50 rounded-lg shadow-sm overflow-hidden"
          style={{ height: 'calc(100vh - 160px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <p className="font-sans text-lg font-medium text-foreground">Filters</p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-sans text-primary hover:underline"
              >
                Clear All ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Scrollable Filter Content */}
          <div
            className="p-4 overflow-y-auto overscroll-contain"
            style={{
              height: 'calc(100% - 70px)',
              scrollbarWidth: 'thin',
              scrollbarGutter: 'stable'
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            {filterContent}
          </div>
        </div>
      </aside>

      {/* Mobile Filter Bar */}
      <div className="lg:hidden sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3 sm:py-3 mb-4 sm:mb-4 -mx-4 px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-border rounded-full font-sans text-xs sm:text-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-white text-[10px] sm:text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{totalProducts} Items</span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
            >
              <SelectTrigger className="h-8 sm:h-9 w-27.5 sm:w-37.5 rounded-full text-xs sm:text-sm border-border">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-background z-50 overflow-y-auto"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <p className="font-display text-base sm:text-lg font-medium text-foreground">Filters</p>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-muted"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {filterContent}

                <div className="sticky bottom-0 pt-4 pb-2 bg-background border-t border-border mt-6 sm:mt-8 -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <Button
                    onClick={() => setMobileOpen(false)}
                    fullWidth
                    rounded="full"
                    size="default"
                  >
                    Show {totalProducts} Products
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
