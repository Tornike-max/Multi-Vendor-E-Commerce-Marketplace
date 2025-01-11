<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Enums\ProductVariationTypeEnum;
use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;
use PhpParser\Node\Stmt\Label;

class ProductVariations extends EditRecord
{
    protected static string $resource = ProductResource::class;
    //protected static string $title = 'Variation';
    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list';


    public function form(Form $form): Form
    {
        $types = $this->record->variationTypes;
        $fields = [];
        foreach ($types as $type) {
            $fields[] = TextInput::make('variation_type_' . $type['id'] . 'id')
                ->hidden();
            $fields[] = TextInput::make('variation_type_' . $type['id'] . 'name')
                ->label($type['name']);
        }

        return $form->schema([
            Repeater::make('variations')
                ->label('false')
                ->collapsible()
                ->defaultItems(1)
                ->schema([
                    Section::make()
                        ->schema($fields)
                        ->columns(3),
                    TextInput::make('quantity')
                        ->label('Quantity')
                        ->numeric(),
                    TextInput::make('price')
                        ->label('Price')
                        ->numeric(),
                ])
                ->columns(2)
                ->columnSpan(2)
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $variations = $this->record->variations->toArray();
        $data['variations'] = $this->mergeCartesianWithExisting($this->record->variationTypes, $variations);
        return $data;
    }

    public function mergeCartesianWithExisting($variationTypes, $existingData)
    {
        $defaultQuantity = $this->record->quantiy;
        $defaultPrice = $this->record->price;
        $cartesianProduct = $this->cartesianProduct($variationTypes, $defaultQuantity, $defaultPrice);
        $mergedResult = [];

        foreach ($cartesianProduct as $product) {
            $optionIds = collect($product)
                ->filter(fn($value, $key) => str_starts_with($key, 'variation_type_'))
                ->map(fn($option) => $option['id'])
                ->values()
                ->toArray();

            $match = array_filter($existingData, function ($existingOption) use ($optionIds) {
                return $existingOption['variation_type_option_ids'] === $optionIds;
            });

            if (!empty($match)) {
                $existingEntry = reset($match);
                $product['quantity'] = $existingEntry['quantity'];
                $product['price'] = $defaultPrice;
            } else {
                $product['quantity'] = $defaultQuantity;
                $product['price'] = $defaultPrice;
            }

            $mergedResult[] = $product;
        }
        return $mergedResult;
    }

    private function cartesianProduct($variationTypes, $defaultQuantity = null, $defaultPrice = null)
    {
        $result = [[]];
        foreach ($variationTypes as $variationType) {
            $temp = [];
            foreach ($variationType->options as $option) {
                foreach ($result as $combination) {
                    $newCombination = $combination + [
                        'variation_type_' . $variationType['id'] => [
                            'id' => $option->id,
                            'name' => $option->name,
                            'label' => $variationType->name
                        ]
                    ];
                    $temp[] = $newCombination;
                }
            }
            $result = $temp;
        }

        foreach ($result as $combination) {
            if (count($combination) === count($variationTypes)) {
                $combination['quantity'] = $defaultQuantity;
                $combination['price'] = $defaultPrice;
            }
        }

        return $result;
    }
}
