'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useTransition } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const hasInteracted = useRef(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!hasInteracted.current) return;

    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        } else {
          router.push('/search'); 
        }
      });
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router]);

  return (
    <InputGroup className="h-8">
      <InputGroupAddon>
        <Search className='text-zinc-400'/>
      </InputGroupAddon>
      <InputGroupInput 
        placeholder="Search movies" 
        value={query}
        onChange={(e) => {
          hasInteracted.current = true;
          setQuery(e.target.value);
        }}
        className="text-xs sm:text-sm"
      />
    </InputGroup>
  );
}