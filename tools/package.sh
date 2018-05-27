#!/bin/bash -eu

print_error() {
	printf "\e[41m%s\e[0m\n" "$*" >&2
}

print_warning() {
	printf "\e[43;30m%s\e[0m\n" "$*" >&2
}

print_cmd() {
	#printf "\e[46;30;1m%s\e[0m\n" "$*"
	printf "\e[36;1m%s\e[0m\n" "$*" >&2
}

print_message() {
	printf "\e[36m%s\e[0m\n" "$*" >&2
}

die() {
	print_error "$@"
	exit 1
}

exec_cmd() {
	print_cmd "> $@"
	"$@" || die "failed; cwd=$(pwd)"
}

_pushd() {
	pushd "$*" >/dev/null 2>&1 || die "pushd $* failed"
}

_popd() {
	popd >/dev/null 2>&1 || die "popd failed"
}

main() {
	local version dest_name
	version="$1"
	dest_name="mayfes2018-pikyou-${version}"

	# check dirty/untracked files
	[[ $(git diff HEAD --shortstat 2> /dev/null | tail -n1) != "" ]] && _git_dirty=1
	_git_untracked=$(git status --porcelain 2>/dev/null| grep "^??" | wc -l)

	if [ ${_git_untracked} -gt 0 -o ${_git_dirty-0} -gt 0 ]; then
		if ${DIRTY_DEPLOY+false} :; then
			print_error "You have dirty/untracked files. Please commit/ignore them first."
			print_error " note: you can ignore files locally with .git/info/exclude"
			die "precondition failure"
		fi
	fi

	print_warning "packager: preparing clean worktree..."
	test -d package-worktree.tmp && rm -rf package-worktree.tmp/
	exec_cmd git worktree add package-worktree.tmp HEAD

	_pushd package-worktree.tmp

	print_warning "packager: installing libraries..."
	exec_cmd yarn

	print_warning "packager: building files..."
	exec_cmd yarn run build
	exec_cmd yarn run unite

	print_warning "packager: copying assets files..."
	test -d "${dest_name}" || mkdir -p "${dest_name}"
	exec_cmd rsync -rv assets/ united/main.js "${dest_name}/"

	print_warning "packager: packaging files..."
	exec_cmd zip -r "${dest_name}.zip" "${dest_name}"
	exec_cmd mv "${dest_name}.zip" ../

	print_warning "packager: cleaning files..."
	_popd
	rm -rf package-worktree.tmp
	git worktree prune

	print_warning "packager: done!"
}

print_warning "Enter version string (like v*.*; v1.2)"
read version_string

if [ -z "${version_string}" ]; then
	die "You must enter version for packaging"
fi

cd "$(dirname "$0")/.."
main "${version_string}"

