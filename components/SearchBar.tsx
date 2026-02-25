'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const [isPending, startTransition] = useTransition();

useEffect(() => {
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
    <InputGroup>
      <InputGroupAddon>
        <Search className='text-zinc-400'/>
      </InputGroupAddon>
      <InputGroupInput 
        placeholder="Search movies" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </InputGroup>
  );
}