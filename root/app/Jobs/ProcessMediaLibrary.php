<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Queue\Queueable;

class ProcessMediaLibrary implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $parameter;
    /**
     * Create a new job instance.
     */
    public function __construct($parameter)
    {
        $this->parameter = $parameter;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        ProcessMediaLibrary::dispatch($this->parameter);
    }
}
