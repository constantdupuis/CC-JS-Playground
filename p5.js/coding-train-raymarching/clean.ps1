# PowerShell script to delete the node_modules folder in the current directory

# Specify the path to the "node_modules" folder using relative notation
$nodeModulesPath = ".\node_modules"

# Check if the folder exists before attempting to delete it
if (Test-Path $nodeModulesPath -PathType Container) {
    try {
        # Delete the "node_modules" folder and its contents recursively
        Remove-Item -Path $nodeModulesPath -Recurse -Force
        Write-Host "The 'node_modules' folder has been deleted."
    } catch {
        Write-Host "Failed to delete the 'node_modules' folder. Error: $_"
    }
} else {
    Write-Host "The 'node_modules' folder does not exist in the current directory."
}