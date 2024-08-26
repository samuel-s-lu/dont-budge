trap 'kill $(jobs -p)' EXIT SIGINT SIGTERM

cd backend
dotnet run --launch-profile https &
cd ../frontend
ng serve --open &
cd ..

wait