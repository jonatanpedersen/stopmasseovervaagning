import feedRead from 'feed-read';

export function getPocketRssFeed(callback) {
	return feedRead('https://getpocket.com/users/jonatanpedersen/feed/all', callback);
}
