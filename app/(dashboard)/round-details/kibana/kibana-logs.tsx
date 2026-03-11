"use client"

import React, { useState } from 'react';
import { Search, Filter, Terminal, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data based on your payload
const MOCK_HITS = [
  { id: "1", timestamp: "2026-03-08 03:00:08", message: "userId: ppc1735... Done bet validation: seat 6", index: "filebeat-casino" },
  { id: "2", timestamp: "2026-03-08 03:00:11", message: "VirtualCardQueue: [VirtualCardCommand(seat=6...)]", index: "filebeat-dealermodule" },
];

export default function KibanaView() {
  // Using a string format YYYY-MM-DD for the native input
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [filters, setFilters] = useState([
    { key: "message", value: "seat=6" },
    { key: "contextMap.gameId", value: "12144294818" }
  ]);

  return (
    <div className="flex flex-col h-screen bg-background p-6 gap-4">
      <Card className="border-b shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-primary">
            <Terminal className="h-5 w-5" /> PP Pulse Log Explorer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top Bar: Index, Search, and Native Date */}
          <div className="flex gap-2">
            <div className="w-[220px]">
              <Select defaultValue="filebeat-*">
                <SelectTrigger className="bg-muted/50">
                  <SelectValue placeholder="Select Index" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filebeat-*">filebeat-*</SelectItem>
                  <SelectItem value="filebeat-casino-*">filebeat-casino-*</SelectItem>
                  <SelectItem value="filebeat-dealermodule-*">filebeat-dealermodule-*</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search logs (e.g. 227303278618008 OR 12144294818)" 
                className="pl-8"
              />
            </div>

            {/* Standard HTML5 Date Input */}
            <Input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[180px] cursor-pointer"
            />

            <Button className="gap-2">
              <RotateCw className="h-4 w-4" /> Refresh
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filters
            </span>
            {filters.map((f, i) => (
              <Badge key={i} variant="secondary" className="px-2 py-1 gap-1 font-normal border">
                <span className="text-muted-foreground">{f.key}:</span> {f.value}
                <button className="ml-1 hover:text-destructive transition-colors">×</button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-7 text-xs border-dashed border">
              + Add filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <div className="rounded-md border bg-card flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[200px]">@timestamp</TableHead>
              <TableHead className="w-[150px]">index</TableHead>
              <TableHead>message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_HITS.map((hit) => (
              <TableRow key={hit.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-[11px] whitespace-nowrap text-muted-foreground">
                  {hit.timestamp}
                </TableCell>
                <TableCell>
                   <Badge variant="outline" className="text-[10px] font-medium bg-background">
                     {hit.index}
                   </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs break-all leading-relaxed">
                  {hit.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}