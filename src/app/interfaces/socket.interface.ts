export interface SocketResponse {
    message: string;
    ok: false;
    type: 'room-not-found' | 'game-started';
}
