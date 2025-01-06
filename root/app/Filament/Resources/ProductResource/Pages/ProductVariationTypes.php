<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Enums\ProductVariationTypeEnum;
use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class ProductVariationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $navigationIcon = 'heroicon-c-photo';


    public function form(Form $form): Form
    {
        return $form->schema([
            Repeater::make('variationTypes')
                ->relationship()
                ->collapsible()
                ->defaultItems(1)
                ->addActionLabel('Add new variation type')
                ->columns(2)
                ->columnSpan(2)
                ->schema([
                    TextInput::make('name')->required(),
                    Select::make('type')
                        ->options(ProductVariationTypeEnum::labels()),
                    Repeater::make('options')
                        ->relationship()
                        ->collapsible()
                        ->schema([
                            TextInput::make('name')
                                ->columnSpan(2)
                                ->required(),
                            SpatieMediaLibraryFileUpload::make('images')
                                ->image()
                                ->multiple()
                                ->openable()
                                ->reorderable()
                                ->panelLayout('grid')
                                ->collection('images')
                                ->appendFiles()
                                ->preserveFilenames()
                                ->columnSpan(3)
                        ])->columnSpan(2)
                ]),
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
