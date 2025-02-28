<?php

namespace App\Models;

use App\Enums\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
// use Illuminate\Bus\Queueable;


class Product extends Model implements HasMedia
{

    use InteractsWithMedia;

    protected $casts = [
        'variations' => 'array'
    ];

    public function scopeForVendor(Builder $query): Builder
    {
        return $query->where('created_by', '=', Auth::user()->id);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', '=', ProductStatusEnum::Published);
    }
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(100)->height(100);;
        $this->addMediaConversion('small')->width(480)->height(480);;
        $this->addMediaConversion('large')->width(1200)->height(800);;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function variationTypes(): HasMany
    {
        return $this->hasMany(VariationType::class);
    }

    public function productVariations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }
}
