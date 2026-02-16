'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ReactNode } from 'react';

type Props = {
    label: string;
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
    isLoading?: boolean;

    showUsd?: boolean;
    usdText?: string;

    selector?: ReactNode;
    balance?: ReactNode;
    maxButton?: ReactNode;

    hasError?: boolean;
};

export default function AssetAmountFieldUI({
    label,
    value,
    onChange,
    disabled,
    isLoading,
    showUsd,
    usdText,
    selector,
    balance,
    maxButton,
    hasError = false
}: Props) {
    return (
        <div className="max-w-xl bg-background-tertiary border-2 border-background-tertiary rounded-xl p-4">
            <div className="mb-3">
                <span className="text-sm font-medium text-text-secondary">{label}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
                {/* Amount */}
                <div className="flex-1 space-y-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Skeleton className="h-8 w-full rounded-full" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Input
                                type="text"
                                inputMode="decimal"
                                placeholder="0"
                                value={value}
                                onInput={(e) => {
                                    const val = (e.target as HTMLInputElement).value.trim();
                                    onChange(val);
                                }}
                                onKeyDown={(e) => {
                                    if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                }}
                                className={`text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent border-none h-10 sm:h-12 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 ${hasError ? 'text-red-400' : 'text-text-primary'}`}
                                onWheel={(e) => e.currentTarget.blur()}
                                disabled={disabled}
                                min={0}
                            />
                            {maxButton}
                        </div>
                    )}

                    {showUsd && (
                        isLoading ? (
                            <Skeleton className="h-4 w-20 rounded-full" />
                        ) : (
                            <span className="text-sm h-4 text-text-secondary">{usdText}</span>
                        )
                    )}
                </div>

                {/* Selector + Balance */}
                <div className="flex-shrink-0">
                    <div>{selector}</div>
                    {balance && <div className="mt-1">{balance}</div>}
                </div>
            </div>
        </div>
    );
}
