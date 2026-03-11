"use client";

import { PlayerBetTxnInfoSchema, PlayerBetTxnInfoProps, PlayerParamId } from "@/types/player-bet-info";
import { useForm, useStore } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowLeftRight, User, Fingerprint } from "lucide-react";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onSubmit: (data: PlayerBetTxnInfoProps, kibanaFunction: string) => void;
}

export const BO_VALIDATIONS = [
  "LATE BET",
  "PAYOUT CHECK",
  "CUSTOM"
] as const;

export type BOValidationType = typeof BO_VALIDATIONS[number];

export function RoundDetailsForm({ onSubmit }: Props) {
  const [validator, setValidator] = React.useState<BOValidationType>("LATE BET");
  const form = useForm({
    defaultValues: {
      gameParamId: "round_id",
      playerParamId: "",
      game_id: "",
      user_id: "",
    } as PlayerBetTxnInfoProps,
    validators: {
      onChange: PlayerBetTxnInfoSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value, validator);
    },
  });

  const gameParam = useStore(form.store, (s) => s.values.gameParamId);
  const playerParam = useStore(form.store, (s) => s.values.playerParamId);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-2"
    >
      {/* Primary Row: ID Selection and Action Buttons */}
      <div className="flex items-center gap-2">
        <form.Field
          name="gameParamId"
          children={(field) => (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 w-32 bg-muted/30 font-medium"
              onClick={() => {
                const next = field.state.value === "round_id" ? "game_id" : "round_id";
                field.handleChange(next as any);
                form.validateField("game_id", "change");
              }}
            >
              {field.state.value === "round_id" ? "Round ID" : "Game ID"}
              <ArrowLeftRight className="ml-2 h-3 w-3 opacity-50" />
            </Button>
          )}
        />

        <form.Field
          name="game_id"
          children={(field) => (
            <Input
              placeholder={gameParam === "round_id" ? "Enter Round ID..." : "Enter Game ID..."}
              className="h-9 flex-1"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value.trim())}
            />
          )}
        />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => form.reset()}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button type="submit" size="sm" className="h-9 px-4">
            Fetch
          </Button>
        </div>
      </div>

      {/* Secondary Row: Player ID Toggle (Only if Game ID is selected) */}
      {gameParam === "game_id" && (
        <div className="flex items-center gap-2 px-1 animate-in fade-in slide-in-from-top-1">
          <form.Field
            name="playerParamId"
            children={(field) => (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => {
                  const next = field.state.value === "user_id" ? "login_id" : "user_id";
                  field.handleChange(next as any);
                }}
              >
                {field.state.value === "user_id" ? (
                  <User className="mr-1 h-3 w-3" />
                ) : (
                  <Fingerprint className="mr-1 h-3 w-3" />
                )}
                {field.state.value === "user_id" ? "User ID" : "Login ID"}
              </Button>
            )}
          />

          <form.Field
            name="user_id"
            children={(field) => (
              <Input
                className="h-7 text-xs w-44 bg-muted/20 border-none"
                placeholder={`Enter ${playerParam === "user_id" ? "User" : "Login"} ID...`}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value.trim())}
              />
            )}
          />
        </div>
      )}

      <div className="flex items-center gap-2 px-1 mt-1">
        <span className="text-xs text-muted-foreground w-24">Validation</span>

        <Select
          value={validator}
          onValueChange={(value) => setValidator(value as BOValidationType)}
        >
          <SelectTrigger className="h-7 text-xs w-44">
            <SelectValue placeholder="Select validation" />
          </SelectTrigger>

          <SelectContent>
            {BO_VALIDATIONS.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}